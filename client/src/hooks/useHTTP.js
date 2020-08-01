import { useCallback } from "react"
import { useSelector } from "react-redux"
import { setNewAccessToken } from "../redux/auth/authActions"
import axios from "axios"

function useHTTP() {
  const { token } = useSelector((state) => state.auth)
  const isDevelopment = true

  const fetch = useCallback(
    (
      { url, method, data, options: { isProtectedData = true, ...options } },
      isAuth
    ) => {
      const makeRequest = async (url, method, data, token, isAuth) => {
        const host = isDevelopment
          ? `http://localhost:${isAuth ? "4000" : "5000"}`
          : ""

        const res = await axios({
          url: `${host}${url}`,
          method,
          data,
          headers: token && {
            Authorization: `Basic ${token}`,
          },
        })

        return res.data
      }

      const checkValidAccessToken = async (next = null) => {
        if (token && Date.now() >= token.exp * 1000) {
          const data = await makeRequest(
            "/auth/token",
            "post",
            { refreshToken: token.refreshToken, userId: token.user._id },
            null,
            true
          )

          next && next(setNewAccessToken(data))
          return data.accessToken
        }
        return token.accessToken
      }

      if (options.isLocalDataStorage) {
        return (async function () {
          try {
            const accessToken = await checkValidAccessToken()
            const resData = await makeRequest(
              url,
              method,
              data,
              isProtectedData ? accessToken : null
            )
            return resData
          } catch (error) {
            return console.log("Loacal storage data fetch error: ", error)
          }
        })()
      }
      return async (dispatch) => {
        try {
          dispatch(options.fetchStart())
          // let accessToken = token.accessToken

          // if (token && (Date.now() >= token.exp * 1000)) {
          //   const data = await makeRequest(
          //     "/auth/token",
          //     "post",
          //     { refreshToken: token.refreshToken, userId: token.user._id },
          //     null,
          //     true
          //   )

          //   dispatch(setNewAccessToken(data))
          //   accessToken = data.accessToken
          // }

          const accessToken = await checkValidAccessToken(dispatch)

          const resData = await makeRequest(
            url,
            method,
            data,
            isProtectedData ? accessToken : null,
            isAuth
          )
          // const res = await axios({
          //   url: `${host}${url}`,
          //   method,
          //   data,
          //   headers: tempToken && {
          //     Authorization: `Basic ${tempToken}`,
          //   },
          // })

          dispatch(options.fetchSuccess({ data: resData, options }))
        } catch (error) {
          console.log(error)
          options.fetchFalure &&
            dispatch(options.fetchFalure(error.response.data.errors))
        }
      }
    },
    [isDevelopment, token]
  )

  return { fetch }
}

export default useHTTP

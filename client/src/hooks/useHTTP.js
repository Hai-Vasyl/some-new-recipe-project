import { useCallback } from "react"
import { useSelector } from "react-redux"
import { setNewAccessToken } from "../redux/auth/authActions"
import axios from "axios"

function useHTTP() {
  const { token } = useSelector((state) => state.auth)
  const isDevelopment = true

  const fetch = useCallback(
    ({ url, method, data, options }, isAuth) => {
      const host = isDevelopment
        ? `http://localhost:${isAuth ? "4000" : "5000"}`
        : ""
      return async (dispatch) => {
        try {
          dispatch(options.fetchStart())
          let tempToken = token.accessToken

          if (Date.now() >= token.exp * 1000) {
            const res = await axios({
              url: "http://localhost:4000/auth/token",
              method: "post",
              data: {
                refreshToken: token.refreshToken,
                userId: token.user._id,
              },
            })
            const data = res.data
            dispatch(setNewAccessToken(data))
            tempToken = data.accessToken
          }

          const res = await axios({
            url: `${host}${url}`,
            method,
            data,
            headers: tempToken && {
              Authorization: `Basic ${tempToken}`,
            },
          })

          dispatch(options.fetchSuccess({ data: res.data, options }))
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

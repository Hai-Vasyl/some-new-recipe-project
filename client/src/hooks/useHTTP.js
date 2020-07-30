import { useCallback } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

function useHTTP() {
  const { token } = useSelector((state) => state.auth)
  const isDevelopment = true

  // const fetch = useCallback(
  //   ({ url, method, data, options }, isAuth) => {
  //     const host = isDevelopment
  //       ? `http://localhost:${isAuth ? "4000" : "5000"}`
  //       : ""
  //     dispatch(
  //       fetchData(
  //         { url: `${host}${url}`, method, data, options },
  //         token.accessToken
  //       )
  //     )
  //   },
  //   [dispatch, isDevelopment, token.accessToken]
  // )

  const fetch = useCallback(
    ({ url, method, data, options }, isAuth) => {
      const host = isDevelopment
        ? `http://localhost:${isAuth ? "4000" : "5000"}`
        : ""
      return async (dispatch) => {
        try {
          dispatch(options.fetchStart())
          const res = await axios({
            url: `${host}${url}`,
            method,
            data,
            headers: token.accessToken && {
              Authorization: `Basic ${token.accessToken}`,
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
    [isDevelopment, token.accessToken]
  )
  return { fetch }
}

export default useHTTP

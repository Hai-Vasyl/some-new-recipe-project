import React, { useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import { useSelector, useDispatch } from "react-redux"
import { fetchTestStart, fetchTestSuccess } from "../redux/test1/testActions"

function Test() {
  const { fetch } = useHTTP()
  const dispatch = useDispatch()
  const { test, auth, recipe } = useSelector((state) => state)

  useEffect(() => {
    dispatch(
      fetch({
        url: "/test",
        method: "get",
        data: null,
        options: { fetchStart: fetchTestStart, fetchSuccess: fetchTestSuccess },
      })
    )
  }, [dispatch, fetch])

  return <div>{console.log(test, auth, recipe)}</div>
}

export default Test

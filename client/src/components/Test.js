import React, { useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import { useSelector, useDispatch } from "react-redux"
// import { fetchTestStart, fetchTestSuccess } from "../redux/test1/testActions"

function Test() {
  const { fetch } = useHTTP()
  // const dispatch = useDispatch()
  const { test, auth, recipe } = useSelector((state) => state)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch({
          url: "/test",
          method: "get",
          data: null,
          options: { isLocalDataStorage: true },
        })

        console.log("data", data)
      } catch (error) {}
    }

    fetchData()
  }, [fetch])

  return <div>{console.log(test, auth, recipe)}</div>
}

export default Test

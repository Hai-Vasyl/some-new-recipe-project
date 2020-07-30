import React, { useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import { useSelector, useDispatch } from "react-redux"
import { fetchStart, fetchSuccess } from "../redux/recipe/recipeActions"

function Recipe() {
  const { fetch } = useHTTP()
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetch({
        url: "/recipes",
        method: "get",
        data: null,
        options: { fetchStart: fetchStart, fetchSuccess: fetchSuccess },
      })
    )
  }, [dispatch, fetch])

  return <div>{console.log(state)}</div>
}

export default Recipe

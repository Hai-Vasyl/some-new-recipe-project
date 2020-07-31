import React, { useEffect } from "react"
import useHTTP from "../hooks/useHTTP"
import { useSelector, useDispatch } from "react-redux"
import { fetchStart, fetchSuccess } from "../redux/recipe/recipeActions"

function Recipe() {
  const { fetch } = useHTTP()
  const { recipes, load } = useSelector((state) => state.recipe)
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

  const recipesJSX = recipes.map((item) => {
    return (
      <div key={item.id}>
        <div style={{ color: "red" }}>{item.name}</div>
        <div>{item.recipe}</div>
      </div>
    )
  })

  if (load) {
    return <div>LOADING</div>
  }
  return <div>{recipesJSX}</div>
}

export default Recipe

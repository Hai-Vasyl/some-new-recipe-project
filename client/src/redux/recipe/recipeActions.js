import { FETCH_RECIPE_START, FETCH_RECIPE_SUCCESS } from "./recipeTypes"

export const fetchStart = () => {
  return {
    type: FETCH_RECIPE_START,
  }
}

export const fetchSuccess = (recipes) => {
  return {
    type: FETCH_RECIPE_SUCCESS,
    payload: recipes,
  }
}

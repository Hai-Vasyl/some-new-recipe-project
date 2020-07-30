import { FETCH_RECIPE_START, FETCH_RECIPE_SUCCESS } from "./recipeTypes"

const initialState = {
  load: false,
  recipes: [],
}

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_START:
      return {
        load: true,
        recipes: [],
      }
    case FETCH_RECIPE_SUCCESS:
      return {
        load: false,
        recipes: action.payload.data,
      }
    default:
      return state
  }
}

export default recipeReducer

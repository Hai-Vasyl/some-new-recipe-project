import authReducer from "./auth/authReducer"
import testReducer from "./test1/testReducer"
import recipeReducer from "./recipe/recipeReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  auth: authReducer,
  test: testReducer,
  recipe: recipeReducer,
})

export default rootReducer

import { FETCH_START, FETCH_SUCCESS, FETCH_FALURE } from "./authTypes"

const initialState = {
  load: false,
  token: {},
  error: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        load: true,
      }
    case FETCH_SUCCESS:
      return {
        load: false,
        token: action.payload,
        error: [],
      }
    case FETCH_FALURE:
      return {
        load: false,
        token: {},
        error: action.payload,
      }
    default:
      return state
  }
}

export default authReducer

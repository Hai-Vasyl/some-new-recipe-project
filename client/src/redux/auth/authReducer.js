import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_FALURE_AUTH,
  CLEAR_ERROR_AUTH,
  CLEAR_SPECIFIC_ERROR_AUTH,
  SET_ERROR_AUTH,
  SET_AUTH,
} from "./authTypes"

const initialState = {
  load: false,
  token: {},
  error: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START_AUTH:
      return {
        ...state,
        load: true,
      }
    case FETCH_SUCCESS_AUTH:
      const { data } = action.payload
      localStorage.setItem("auth", JSON.stringify(data))
      return {
        load: false,
        token: data,
        error: [],
      }
    case FETCH_FALURE_AUTH:
      return {
        load: false,
        token: {},
        error: action.payload,
      }
    case CLEAR_ERROR_AUTH:
      return {
        ...state,
        error: [],
      }
    case CLEAR_SPECIFIC_ERROR_AUTH:
      return {
        ...state,
        error: state.error.map((err) => {
          if (err.param === action.payload) {
            err.msg = ""
          }
          return err
        }),
      }
    case SET_AUTH:
      let auth = localStorage.getItem("auth")
      if (!auth) {
        return state
      }
      auth = JSON.parse(auth)
      return {
        ...state,
        token: auth,
      }
    case SET_ERROR_AUTH:
      return {
        ...state,
        error: [
          ...state.error,
          { param: action.payload.param, msg: "Fill this field!" },
        ],
      }
    default:
      return state
  }
}

export default authReducer

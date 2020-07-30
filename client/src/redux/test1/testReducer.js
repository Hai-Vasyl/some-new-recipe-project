import { FETCH_START, FETCH_SUCCESS } from "./testTypes"

const initialState = {
  load: false,
  data: [],
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        load: true,
        data: [],
      }
    case FETCH_SUCCESS:
      return {
        load: false,
        data: action.payload.data,
      }
    default:
      return state
  }
}

export default testReducer

import { FETCH_START, FETCH_SUCCESS, FETCH_FALURE } from "./authTypes"

export const fetchStart = () => {
  return {
    type: FETCH_START,
  }
}
export const fetchSuccess = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  }
}
export const fetchFalure = (error) => {
  return {
    type: FETCH_FALURE,
    payload: error,
  }
}

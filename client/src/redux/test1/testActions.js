import { FETCH_START, FETCH_SUCCESS } from "./testTypes"

export const fetchTestStart = () => {
  return {
    type: FETCH_START,
  }
}
export const fetchTestSuccess = (data) => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  }
}

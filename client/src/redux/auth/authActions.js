import {
  FETCH_START_AUTH,
  FETCH_SUCCESS_AUTH,
  FETCH_FALURE_AUTH,
  CLEAR_ERROR_AUTH,
  CLEAR_SPECIFIC_ERROR_AUTH,
  SET_ERROR_AUTH,
  SET_AUTH,
} from "./authTypes"

export const fetchStart = () => {
  return {
    type: FETCH_START_AUTH,
  }
}
export const fetchSuccess = (data) => {
  return {
    type: FETCH_SUCCESS_AUTH,
    payload: data,
  }
}
export const fetchFalure = (error) => {
  return {
    type: FETCH_FALURE_AUTH,
    payload: error,
  }
}
export const clearError = () => {
  return {
    type: CLEAR_ERROR_AUTH,
  }
}
export const clearSpecificError = (param) => {
  return {
    type: CLEAR_SPECIFIC_ERROR_AUTH,
    payload: param,
  }
}
export const setAuth = () => {
  return {
    type: SET_AUTH,
  }
}
export const setError = (param) => {
  return {
    type: SET_ERROR_AUTH,
    payload: param,
  }
}

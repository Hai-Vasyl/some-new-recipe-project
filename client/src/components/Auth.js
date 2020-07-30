import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import useHTTP from "../hooks/useHTTP"
import {
  fetchStart,
  fetchSuccess,
  fetchFalure,
  clearError,
  clearSpecificError,
  setError,
} from "../redux/auth/authActions"

function Auth() {
  const { fetch } = useHTTP()
  const { load, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [form, setForm] = useState([
    { param: "username", value: "", type: "text" },
    { param: "email", value: "", type: "email" },
    { param: "password", value: "", type: "password" },
  ])
  const [isLogin, setIsLogin] = useState(true)

  const handleChangeForm = () => {
    setIsLogin(!isLogin)
    dispatch(clearError())
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let isEmptyFields = false
    form.forEach((item) => {
      if (!item.value) {
        if (isLogin && item.param === "username") {
          return
        }
        isEmptyFields = true
        dispatch(setError(item))
      }
    })
    if (isEmptyFields) {
      return
    }

    const [username, email, password] = form
    dispatch(
      fetch(
        {
          url: `/auth/${isLogin ? "login" : "register"}`,
          method: "post",
          data: {
            username: !isLogin && username.value,
            email: email.value,
            password: password.value,
          },
          options: { fetchStart, fetchSuccess, fetchFalure },
        },
        true
      )
    )
  }

  const handleChange = (e) => {
    setForm(
      form.map((item) => {
        if (item.param === e.target.name) {
          item.value = e.target.value
        }
        return item
      })
    )
    dispatch(clearSpecificError(e.target.name))
  }

  const getError = (item) => {
    let msg = ""
    error.forEach((err) => {
      if (item.param === err.param) {
        msg = err.msg
      }
    })
    return msg
  }

  const inputs = form.map((item, index) => {
    return (
      <label
        className={`field ${
          item.param === "username" && isLogin && "field--close"
        }`}
        key={item.param}
      >
        <div className='field__name-container'>
          <span className='field__name'>{item.param}:</span>
          <div
            className={`field__msg-container ${
              !getError(item) && "field__msg-container--close"
            }`}
          >
            <BsInfoCircle className='field__msg-icon' />
            <span className='field__msg'>
              <span className='field__triangle'></span>
              {getError(item)}
            </span>
          </div>
        </div>
        <input
          type={item.type}
          className={`field__input ${getError(item) && "field__input--error"}`}
          name={item.param}
          value={item.value}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
    )
  })
  return (
    <div className='auth-form'>
      <div className={`auth-form__loader ${load && "auth-form__loader--spin"}`}>
        <div className='auth-form__spiner'></div>
      </div>
      <h2 className='auth-form__title'>{isLogin ? "Login" : "Register"}</h2>
      <form className='auth-form__container' onSubmit={handleSubmit}>
        {inputs}
        <button className='auth-form__btn-submit'></button>
      </form>
      <div className='auth-form__btn-container'>
        <button
          className='btn btn-label-left btn-primary'
          onClick={handleSubmit}
        >
          {isLogin ? <AiOutlineLogin /> : <AiOutlineCheckCircle />}
          <span className='btn__name'>{isLogin ? "Sign In" : "Sign Up"}</span>
        </button>
        <button
          className='btn btn-label-left btn-simple'
          onClick={handleChangeForm}
        >
          {isLogin ? <AiOutlineCheckCircle /> : <AiOutlineLogin />}
          <span className='btn__name'>{isLogin ? "Sign Up" : "Sign In"}</span>
        </button>
      </div>
    </div>
  )
}

export default Auth

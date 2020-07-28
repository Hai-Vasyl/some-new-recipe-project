import React, { useState } from "react"
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"

function Auth() {
  const [form, setForm] = useState([
    { param: "username", value: "", msg: "" },
    { param: "email", value: "", msg: "" },
    { param: "password", value: "", msg: "" },
  ])
  const [isLogin, setIsLogin] = useState(true)

  const handleChangeForm = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
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
  }

  const inputs = form.map((item) => {
    return (
      <label
        className={`field ${
          item.param === "username" && isLogin && "field--close"
        }`}
        key={item.param}
      >
        <div className='field__name-container'>
          <span className='field__name'>{item.param}:</span>
          <div className='field__msg-container'>
            <BsInfoCircle />
            <span className='field__msg'>
              <span className='field__triangle'></span>
              {item.msg}
            </span>
          </div>
        </div>
        <input
          type='text'
          className='field__input'
          name={item.param}
          value={item.value}
          onChange={handleChange}
        />
      </label>
    )
  })
  return (
    <div className='auth-form'>
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

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuth } from "./redux/auth/authActions"
import Auth from "./components/Auth"
import Test from "./components/Test"
import Recipe from "./components/Recipe"
import "./App.scss"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuth())
  }, [dispatch])

  return (
    <div className='App'>
      <Auth />
      <Recipe />
      <Test />
    </div>
  )
}

export default App

import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuth } from "./redux/auth/authActions"
// import Auth from "./components/Auth"
// import Test from "./components/Test"
// import Recipe from "./components/Recipe"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./components/Routes"
import "./App.scss"

function App() {
  const dispatch = useDispatch()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    dispatch(setAuth())
    setLoad(false)
  }, [dispatch])

  if (load) {
    return <div>LOADING...</div>
  }
  return (
    <Router>
      <div className='App'>
        <Routes/>
        {/* <Auth />
        <Recipe />
        <Test /> */}
      </div>
    </Router>
  )
}

export default App

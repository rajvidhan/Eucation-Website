import React from 'react'
import loginImage from "../assets/Images/login.webp"
import Template from "../components/cors/Auth/Template"
const Login = () => {
  return (
    <Template 
    title="Welcome Back"
    description1="Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your carrer."
    image={loginImage}
    formType="login"
    />
  )
}

export default Login

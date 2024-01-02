import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {

const [emailSend , setEmailSend] = useState(false);
const [email,setEmail] = useState("");

const {loading} = useSelector((state)=state.auth)


  return (
    <div>
      {
           loading ? (
            <div>Loading...</div>
           ):(
            <div>
               <h1>{
                !emailSend ? "Reset your Password" :"Check your Email"
}</h1>


            </div>
           )
      }
    </div>
  )
}

export default ForgotPassword

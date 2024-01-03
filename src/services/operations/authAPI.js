import { toast } from "react-hot-toast";
import {
  sendOtp,
  resetPasswordToken,
  resetPassword,
  signup,
} from "../../utils/Apiroutes";
import axios from "axios";
import { setLoading, setToken } from "../../slices/authSlice";

// for send the otp
export  function otpsender(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await axios.post(sendOtp, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// for reset the password pls call the  backend
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(resetPasswordToken, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent😇");
      setEmailSent(true);
    } catch (err) {
      console.log("reset password token error");
      toast.error("Failed to sent email for reset password 😈 ");
    }
    dispatch(setLoading(false));
  };
}

//reset password

export function ResetPassword(password, confirmpassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(resetPassword, {
        password,
        confirmpassword,
        token,
      });

      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully😇");
      navigate("/login");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password😈");
    }
    dispatch(setLoading(false));
  };
}

// for sign up the user
// after the verify email address


export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmpassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      
      const response = await axios.post(signup, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup");
      toast.dismiss(toastId)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
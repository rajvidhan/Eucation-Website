import { toast } from "react-hot-toast";
import { sendOtp } from "../../utils/Apiroutes";
import axios from "axios";
import { setLoading, setToken } from "../../slices/authSlice";

export async function otpsender(email, navigate) {
  try {
    const { data } = await axios.post(sendOtp, {
      email,
    });

    toast.success("OTP Sent Successfully");
    navigate("/verify-email");
  } catch (err) {
    console.log(err);
    toast.error("Do Not Send Otp");
  }
}

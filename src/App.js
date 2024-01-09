import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About"
import ContactForm from "./components/Contactpage/ContactForm";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./components/cors/Dashboard/MyProfile"
import Sidebar from "./components/cors/Dashboard/Sidebar";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import Error from "./pages/Error"
import Setting from "./components/cors/Dashboard/Setting";
import EnrolledCourses from "./components/cors/Dashboard/EnrolledCourses";


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
       

        <Route element={
          <PrivateRoute>
             <DashBoard />
          </PrivateRoute>
        } >

          <Route path="/dashboard/my-profile" element={<MyProfile/>} />
          <Route path="/dashboard/settings" element={<Setting/>} />
          
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
      
        </Route>
        <Route path="*" element={<Error/>} />
        


      </Routes>
    </div>
  );
}

export default App;

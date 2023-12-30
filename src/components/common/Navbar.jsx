import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux'
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropDown from "../cors/Auth/Profiledropdown";
import { apiconnecter } from "../../services/apiconnector";
import {categories} from "../../services/Apis"
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"

//self
import {allcategiryRoute} from "../../utils/Apiroutes"
import axios from "axios"



const Navbar = () => {
  
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state)=> state.cart)



   const location= useLocation();
    const matchRoute =(route)=>{
          return matchPath({path:route},location.pathname);
    };

// fetch the data from backend
//self made
    const [items, setItems] = useState([]);
    const fetchdata = async ()=>{
     try{
       const result = await axios.get(allcategiryRoute);
       const size = result.data.allCategories.length;
       const categories = [];
       for(let i=0;i<=size-1;i++){
        const categoryname = result.data.allCategories[i];
        categories.push(categoryname);
       }
       setItems(categories);
      console.log(items)
     }catch(err){
      console.log("the error is >", err.message);
     }
    }
    useEffect(()=>{
     fetchdata();
    },[]);
  
   
// const [subLinks,setSublinks]= useState([]);
// const fetchSublinks = async ()=>{
//     try{
//     const result = await apiconnecter("GET",categories.CATEGORIES_API);
//     console.log("printing sublinks results > ", result);
//     setSublinks(result.data.data);

//     }catch(err){
//       console.log(err);
//       console.log("not fetch the category list brother")
//     }
//    }
//     useEffect(()=>{
//       fetchSublinks();
//      },[])


  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent   gap-[32px]">
        {/* first */}
        <Link to="/">
          <img
            src={logo}
            alt="logo image"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>

        {/* second */}
        <nav>
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
             <li key={index}>
                {link.title == "Catalog" ? (
                  <div className="relative flex flex-row items-center gap-2 group cursor-pointer">
                    <p>{link.title}</p>
                    <MdOutlineKeyboardDoubleArrowDown className="cursor-pointer" />
                    <div className="invisible z-10 absolute left-[50%]
                    translate-x-[-50%] translate-y-[20%] top-[50%] flex flex-col rounded-md bg-white 
                    p-4 text-richblack-900  transition-all duration-200 group-hover:visible
                    group-hover:opacity-100 lg:w-[300px]">
                     <div className="absolute z-10 left-[50%] top-0 h-6 w-6 rotate-45 translate-y-[-45%]
                     rounded bg-white  translate-x-[80%]"></div>
                     
                     {
                      items.length ? ((
                      items.map((category,index)=>(
                        <Link key={index} to={`/catalog/${category.name}`}>
                          <p className="border-b-richblack-300  hover:text-white hover:rounded-lg hover:bg-richblack-900 hover:bg-opacity-25 text-richblack-900  font-bold font-serif px-2 py-2 ">{category.name}</p>
                        </Link>
                      ))
                      )):(<div></div>)

                     }

                    </div>
                  </div>
                ) : (
                <Link to={link.path}>
                    <p className= {`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
               </Link>)}
              </li>
            ))}
          </ul>
        </nav>

        {/* third   */}
        {/* login signup dashboard  */}
       <div className="flex flex-row  gap-x-4 items-center">


         {/* is show the cart icon or not  */}
         {
          user && user.accountType != "Instructor"  && (
    <Link to="/dashboard/cart" className="relative">
    <CiShoppingCart />
    {
      totalItems>0 && (
        <span className="text-white">
          {totalItems}
        </span>
      )
    }
    </Link>
          )}
    {/* is login button is show or not  */}

    {
      token == null && (
        <Link to="/login">
          <button className= {`${matchRoute("/login") ? "text-yellow-25" : "text-richblack-25 "} border border-richblack-700
          bg-richblack-800 px-[12px] py-[5px] rounded-md`}>
            Login
          </button>
        </Link>
      ) 
    }
  {/* sign up button is shown or not  */}
    {
      token == null && (
        <Link to="/signup">
          <button className= {`${matchRoute("/signup") ? "text-yellow-25" : "text-richblack-25"} border border-richblack-700
          bg-richblack-800 px-[12px] py-[5px] rounded-md`}>
            Sign Up
          </button>
        </Link>
       
      )
    }

    {
      token != null && <ProfileDropDown />
    }

       </div>

     </div>
    </div>
  );
};

export default Navbar;

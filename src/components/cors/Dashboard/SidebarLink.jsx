import React from "react";
import * as Icons from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const SidebarLink = ({link,iconName}) => {
  //  nya trika
 

  const Icon = Icons[iconName];
  const location = useLocation();
 

  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname);
};

  return (
    <NavLink
      to={link.path}
      className={`relative px-8  py-2 text-sm  ${
        matchRoute(link.path) ? "bg-yellow-800 text-yellow-1000  " : "bg-opacity-0 text-richblack-300"
      }`}
      
    >
      <span
        className={` ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        } absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-1000`}
      ></span>

       <div className="flex item-center  gap-x-2">
         <Icon className="text-2xl " />
         <span className="text-[15px]   mt-[3px]"  >{link.name}</span>
       </div>
    
   </NavLink>
 
  )
}

export default SidebarLink;


 
      
    
    
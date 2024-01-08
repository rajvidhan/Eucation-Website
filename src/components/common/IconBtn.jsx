import React from 'react'



const IconBtn = (
    {text,
    onclick,
    icon,
    children,
    disabled,
    outline=false,
    customClasses,
    type}) => {
  return (

            <button className='text-black font-medium p-[10px] bg-yellow-50 rounded-xl ' disabled={disabled} onClick={onclick} type={type} >
                {
                    children ? (
                    <>
                    <span>
                    {text}
                    </span>
                   
                    {children}
                    </>
                    ):(text)
                }
            </button>
     
   
  )
}

export default IconBtn

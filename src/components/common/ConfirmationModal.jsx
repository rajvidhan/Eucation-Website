import React from 'react'
import IconBtn from "./IconBtn"
const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' relative  flex items-cnter justify-center font-bold' >
        <div className='flex flex-col'>
            <p className='text-[20px]'>{modalData.text1}</p>
            <p>{modalData.text2}</p>
            <div className='flex gap-x-9'>
                <IconBtn onclick={modalData?.btn1Handler}
                text = {modalData?.btn1Text} />
                <button className='p-[10px] bg-richblack-600 bg-opacity-50 rounded-xl ' onClick={modalData?.btn2Handler}>
                   {
                    modalData?.btn2Text
                   }
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationModal

import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../../assets/Images/TimelineImage.png"
const timeline =[
  {
    Logo:logo1,
    heading:"Leadership",
    Description:"Fully Committed to the success company"
  },
  {
    Logo:logo2,
    heading:"Leadership",
    Description:"Fully Committed to the success company"
  },
  {
    Logo:logo3,
    heading:"Leadership",
    Description:"Fully Committed to the success company"
  },
  {
    Logo:logo4,
    heading:"Leadership",
    Description:"Fully Committed to the success company"
  }
]


const TimeLineSection = () => {
  return (
    <div className='flex flx-row w-11/12 items-center gap-15'>
        {/* lhs */}
      <div className=' pl-[15%] w-[45%] flex flex-col gap-5'>
          {
            timeline.map((element , index)=>{
              return (
                <div className='flex flex-row gap-6' key={index}>
                  <div className=' w-[50px] h-[50px] bg-white flex items-center'>
                    <img  src={element.Logo} alt="" />
                  </div>
                  <div className='flex flex-col '>
                       <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                       <p className='text-base'>{element.Description}</p>
                  </div>
                </div>
              )
            })
          }
        
      </div>
      {/* rhs */}
      <div className='shadow-blue-200 relative'>
        <img src={timelineimage} alt="timelineimage" className='shadow-blue object-cover h-fit' />
        
        <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
        left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-100 px-7'>
           <p className=' text-3xl font-bold'>10</p>
           <p className='text-caribbeangreen-100 text-sm'>Years Of Experience</p>
          </div>
          <div className='gap-5 flex items-center px-7'>
           <p className=' text-3xl font-bold'>250</p>
           <p className='text-caribbeangreen-100 text-sm'>Types Of Courses</p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default TimeLineSection

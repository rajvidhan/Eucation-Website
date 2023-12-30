import React,{useState} from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HightlightText from "../Homepage/HighlightText"
import coursecard from "./coursecard"
const tabName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skill Paths",
    "Career Paths"
];

const Exploremore = () => {
    const [currentab,setcurrenttab] = useState(tabName[0]);
    const [courses,setcourses] = useState(HomePageExplore[0].courses);
    const [currentcard ,setcurrentcard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setcurrenttab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setcourses(result[0].courses[0]);
        setcurrentcard(result[0].courses[0].heading);
    }
  return (
    <div className='flex flex-col items-center'>
      <div className='text-4xl font-semibold'>
        Unlock the
        <HightlightText text={"Power of Code"}/>
      </div>

      <p className='text-richblack-300 text-center text-sm text-[16px] mt-3'>
      Learn to Build Anything You Can Imagine
      </p>

      <div className='flex flex-row px-1 py-1 rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5'>
        {
            tabName.map((element,index)=>{
             return (
             <div className={`text-[16px] flex flex-row items-center gap-2 ${currentab == element ? "bg-richblack-900 font-medium text-richblack-5"
             :" text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
             hover:text-richblack-5 px-7 py-2`} key={index} onClick={()=>setMyCards(element)}>
                {element}
                </div>
                )
            }
            )
        }
      </div>


<div className='lg:h-[150px]'></div>
{/* coursecard */}
<div className='absolute flex flex-row gap-10 justify-between w-full '>
{
    courses.map((element,index)=>{
      <coursecard key={index} cardData={element} currentcard={currentcard}
      setcurrentcard={setcurrentcard}/>
    }
    )
}
</div>


    </div>
  )
}

export default Exploremore

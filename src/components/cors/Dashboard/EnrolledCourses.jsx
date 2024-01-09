import React from "react";
import { ImBooks } from "react-icons/im";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [enolledCourses, setEnrolledCourses] = useState(null);

  const getCourses = async () => {
    try {

        
    } catch (err) {
      console.log("not able to fetch the enrolled courses..");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className=" w-11/12 max-w-[1000px] py-10">
      <div className="flex items-center">
        <ImBooks className="text-richblack-600 text-[30px] mr-[10px]" />
        <h1 className="text-[30px] font-medium text-white">Enrolled Courses</h1>
      </div>
      <hr className="text-richblack-600" />
    </div>
  );
};

export default EnrolledCourses;

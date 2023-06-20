
import  express  from "express"

const router = express.Router();


import {
 getDoctorInfoById,
 
 updateDoctorProfile,
 getAppointmentOfDoctor,
 changeAppointmentStatus,
 createBlogs,

 getDoctorBlogs,
 editDoctorBlogs,
 DeleteNote

} from "../controllers/doctorControllers.js"







router.post("/get-doctor-info-by-user-id",getDoctorInfoById);



router.patch("/update-doctor-profile",updateDoctorProfile);


router.get("/get-appointments-by-doctor-id",getAppointmentOfDoctor );

router.get("/getdoctorblog",getDoctorBlogs );
  
router.post("/change-appointment-status",changeAppointmentStatus);

 
router.post("/create",createBlogs); 
  
router.put("/editBlog/:blogId",editDoctorBlogs);

  
router.delete("/deleteBlog/:blogId",DeleteNote);





export default router;
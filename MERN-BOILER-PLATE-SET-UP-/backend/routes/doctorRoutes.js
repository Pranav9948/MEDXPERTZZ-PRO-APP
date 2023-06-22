
import  express  from "express"
import {Protect,Doctor} from '../middleware/authMiddleware.js'

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







router.get("/get-doctor-info-by-user-id",Protect,Doctor,getDoctorInfoById);



router.patch("/update-doctor-profile",Protect,Doctor,updateDoctorProfile);


router.get("/get-appointments-by-doctor-id",Protect,Doctor,getAppointmentOfDoctor );

router.get("/getdoctorblog",Protect,Doctor,getDoctorBlogs);
  
router.post("/change-appointment-status",Protect,Doctor,changeAppointmentStatus);

 
router.post("/create",Protect,Doctor,createBlogs); 
  
router.patch("/editBlog/:blogId",Protect,Doctor,editDoctorBlogs);

  
router.delete("/deleteBlog/:blogId",Protect,Doctor,DeleteNote);





export default router;
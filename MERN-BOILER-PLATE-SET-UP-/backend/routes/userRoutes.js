import  express  from "express"

import {
    
 registration,
  loginDetails,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
  BookAppointmentz,
  searchDoctors,
  onlineBookAppointmentz,
  checkAvailiabilty,
  logoutUser,
  getUserProfile,
   getUserAppointments,
   updateUserProfile,
   getBlogs,
   getDetailedBlogs,
   cancelAppointment,
   getDoctorDetails

   

} from "../controllers/userControllers.js"
import { Protect,Admin,Doctor } from "../middleware/authMiddleware.js";




const router = express.Router();





router.post("/register",registration)
router.post('/login',loginDetails)
router.post('/logout',logoutUser)


router.route('/profile').get(Protect,getUserProfile).patch(Protect,updateUserProfile)

router.get("/get-doctor-info-by-id/:id",getDoctorDetails);

router.post("/apply-doctor-account",Protect,applyForDoctorAccount);

router.post("/mark-all-notifications-as-seen",Protect,markAllAsSeen);
  
router.post("/delete-all-notifications",Protect,deleteAllNotifications);

router.get("/getAllApprovedDoctors",getApprovedDoctorsList) 

router.post("/book-appointment",Protect,BookAppointmentz)

router.post("/onlinebook-appointment",Protect,onlineBookAppointmentz)

router.post("/check-booking-avilability",Protect,checkAvailiabilty)

router.get("/get-appointments-by-user-id",Protect,getUserAppointments); 



router.post("/search-doctors",searchDoctors);

router.get("/getblogs",getBlogs);

router.get("/getdetailedblog/:blogId",getDetailedBlogs);

router.delete('/cancelappointment',Protect,cancelAppointment)





export default router;
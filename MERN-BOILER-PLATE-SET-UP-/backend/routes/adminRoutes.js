import  express  from "express"

import {
    

   showalluserz,getUserDetails,updateUserz,deleteUserz,blockUser,unblockUser,getUserProfile,
   detailedDoctorVerify,approveDoctorRequest, adminViewAllDoctors,RejectDoctorAccount

} from "../controllers/adminControllers.js"


import { Admin,Doctor,Protect} from "../middleware/authMiddleware.js";




const router = express.Router();

router.get("/showUserList",Protect,Admin,showalluserz)

router.get("/users/:userId",Protect,Admin, getUserDetails);

router.patch("/updateUser/:userId",Protect,Admin,updateUserz); 

router.delete("/deleteUsers/:userId",Protect,Admin,deleteUserz);

router.patch("/block/:userId",Protect,Admin,blockUser);

router.patch("/unblock/:userId",Protect,Admin,unblockUser); 

router.get('/profile',Protect,Admin,getUserProfile)


router.get("/viewAllDoctors",Protect,Admin,adminViewAllDoctors);

router.get("/detailedDoctorsVerifyPage/:doctorId",Protect,Admin,detailedDoctorVerify);


router.patch("/approveDoctorAccount/:doctorId",Protect,Admin,approveDoctorRequest);

router.delete("/RejectDoctorAccount/:doctorId",Protect,Admin,RejectDoctorAccount) 



export default router;
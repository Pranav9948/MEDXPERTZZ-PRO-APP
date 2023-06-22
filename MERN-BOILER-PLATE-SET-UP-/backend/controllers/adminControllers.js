
import USERS from "../models/userModel.js";
import DOCTORS from '../models/doctorModel.js'
import asyncHandler from "../middleware/asyncHandler.js";


// @desc    showalluserz
// @route   GET /api/admin/showUserList
// @access  Private,ADMIN




const showalluserz = async (req, res) => { 
  try {

    const showallusers = await USERS.find({ isAdmin: false });
   
 
    res.status(200).json(
      showallusers,
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "fetching userslist failed", err, success: false });
  }
};


// @desc   getUserDetails
// @route   GET /api/admin/users/:userId
// @access  Private,ADMIN




const getUserDetails = async (req, res) => {
  try {
    const userId =req.params.userId;

    const userDetails = await USERS.findById(userId); 
    

    res.status(200).json(
     
      userDetails,
    );
  } catch (err) {
    res
      .status(500)
      .send({ message: "userDetails fetching failed", err, success: false });
  }
};


// @desc   updateUserz
// @route   PATCH /api/admin/updateUser/:userId
// @access  Private,ADMIN



const updateUserz = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const data = req.body;

    await USERS.findByIdAndUpdate(userId, data)
      .then((result) => {
        
      })
      .catch((error) => {
       
      });

    const updatedUser = await USERS.findById(userId);
   
    res.status(200).send({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (err) {
   
    res
      .status(500)
      .send({ message: "some error occured", success: false, err });
  }
};

// @desc   deleteUserz
// @route   DELETE /api/admin/deleteUsers/:userId
// @access  Private,ADMIN




const deleteUserz = async (req, res) => {
  try {
    const userId = req.params.userId;

    USERS.findByIdAndRemove(userId)
      .then((result) => {
       
      })
      .catch((error) => {
        
      });

    res.status(200).send({
      message: "deleting users successfull",
      success: true,
    });
  } catch (err) {
    
    res
      .status(500)
      .send({ message: "deleting users failed", err, success: false });
  }
};


// @desc   blockUser
// @route  PATCH /api/admin/block/:userId
// @access  Private,ADMIN


const blockUser = async (req, res) => {

  


  try {
    const user_id =   req.params.userId;
  

    USERS.findByIdAndUpdate(user_id, {
      isBlocked: true,
    })
      .then((result) => {
       
      })
      .catch((error) => {
        
      });

    const userDetails =await USERS.findById( user_id );;

    res
      .status(200)
      .send({ message: "you are blocked", success: true, userDetails });
  } catch (err) {
    res
      .status(500)
      .send({ message: "error blocking user", success: false, err });
  }
};


// @desc  unblockUser
// @route  PATCH /api/admin/unblock/:userId
// @access  Private,ADMIN



const unblockUser = async (req, res) => {
  try {
    const user_id = req.params.userId;
    

    USERS.findByIdAndUpdate(user_id, {
      isBlocked: false,
    })
      .then((result) => {
      
      })
      .catch((error) => {
        
      });

    const userDetails = await USERS.findById(user_id );

    res
      .status(200)
      .send({ message: "you are  unblocked", success: true, userDetails });
  } catch (err) {
    res
      .status(500)
      .send({ message: "error unblocking user", success: false, err });
  }
};

// @desc  getUserProfile
// @route  GET /api/admin/profile
// @access  Private,ADMIN


const getUserProfile = asyncHandler(async (req, res) => {

  try {

 
 const user=await USERS.findById(req.user._id)

 if(user){

  
    res.status(200).json(user);

 }

 else {

  res.status(200).send({
    success: false,
    message: "you are not authorized to view this.",
  });
 }

  
    
  } catch (error) {
    

    res.status(400);
    throw new Error("Error occcured");
};

})


// @desc  adminViewAllDoctors
// @route  GET /api/admin/viewAllDoctors
// @access  Private,ADMIN




const adminViewAllDoctors = async (req, res) => {
  try {
    const allDoctors = await DOCTORS.find({ status:"Approved" });
   
    res.json(allDoctors);

  } catch (err) {
    res.status(500).send({
      message: "fetched all doctors failed",
      err,
      success: true,
    });
  }
};

// @desc   detailedDoctorVerify
// @route  GET /api/admin/detailedDoctorsVerifyPage/:doctorId
// @access  Private,ADMIN




const detailedDoctorVerify = async (req, res) => {
  try {
  
    const doctorId = req.params.doctorId;
   
    const allDoctorRequest = await DOCTORS.findOne({ _id: doctorId });

   
    res.status(200).send(
      
      allDoctorRequest,
    );
  } catch (err) {
    res.status(500).send({
      message: "fetching doctors request failed",
      success: false,
      err,
    });
  }
};



// @desc   approveDoctorRequest
// @route  PATCH /api/admin/approveDoctorAccount/:doctorId
// @access  Private,ADMIN


const approveDoctorRequest = async (req, res) => {
  try {
   
    const doctorId = req.params.doctorId;
    
    const DoctorDetails = await DOCTORS.find({ _id: doctorId });

  
    const userIds = DoctorDetails[0]?.userId;
    
    const userDEtailzzzz = await USERS.find({ _id: userIds });

    
    await USERS.findByIdAndUpdate(userIds, { isDoctor: true })
      .then((result) => {
       
      })
      .catch((error) => {
        
      });

    await DOCTORS.findByIdAndUpdate(doctorId, { status: "Approved" })
      .then((result) => {
        
      })
      .catch((error) => {
       
      });

    const userDetails = await USERS.find({ _id: userIds });

   
    const unseenNotifications = userDetails[0]?.unseenNotifications;

    unseenNotifications?.push({
      type: "DoctorApplySuccessfull",
      message: `congragulations..! your are approved as a doctor`,
      data: {
        doctorId: userDetails._id,
      },
      onClickPath: "/",
    });

    await USERS.findByIdAndUpdate(userIds, { unseenNotifications })
      .then((result) => {
       
      })
      .catch((error) => {
        
      });

    res.status(200).send({
      message: "Approve As Doctor",
      success:true
    });
  } catch (err) {
   
    res.status(500).send({
      message: "Doctor Approval Failed",
      success: false,
      err,
    });
  }
};


// @desc   RejectDoctorAccount
// @route  DELETE /api/admin/RejectDoctorAccount/:doctorId
// @access  Private,ADMIN



const RejectDoctorAccount = async (req, res) => {
  try {
    
    const doctorId = req.params.doctorId;
 

   await DOCTORS.findByIdAndRemove(doctorId)
    .then((result) => {
      
    })
    .catch((error) => {
     
    });

    res.status(200).send({
      message: "Deleted Doctor",
      success:true
    });
  } catch (err) {
    res.status(500).send({
      message: "Doctor Approval Failed",
      success: false,
      err,
    });
  }
};

export {
  showalluserz,
  getUserDetails,
  updateUserz,
  deleteUserz,
  blockUser,
  unblockUser,
  adminViewAllDoctors,
  detailedDoctorVerify,
  RejectDoctorAccount,
  getUserProfile,
  approveDoctorRequest
};
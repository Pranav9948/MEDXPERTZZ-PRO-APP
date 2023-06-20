
import USERS from "../models/userModel.js";
import DOCTORS from '../models/doctorModel.js'
import asyncHandler from "../middleware/asyncHandler.js";

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

const updateUserz = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const data = req.body;

    await USERS.findByIdAndUpdate(userId, data)
      .then((result) => {
        console.log("Updated User : ", result);
      })
      .catch((error) => {
        console.log(error);
      });

    const updatedUser = await USERS.findById(userId);
    console.log("editable", updatedUser);

    res.status(200).send({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (err) {
    console.log("erroccured", err);
    res
      .status(500)
      .send({ message: "some error occured", success: false, err });
  }
};

const deleteUserz = async (req, res) => {
  try {
    const userId = req.params.userId;

    USERS.findByIdAndRemove(userId)
      .then((result) => {
        console.log("Removed User : ");
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(200).send({
      message: "deleting users successfull",
      success: true,
    });
  } catch (err) {
    console.log("123err", err);
    res
      .status(500)
      .send({ message: "deleting users failed", err, success: false });
  }
};

const blockUser = async (req, res) => {

  
console.log("55552 ublock adminId", req.params.userId);
 

  try {
    const user_id =   req.params.userId;
    console.log("xz", user_id);

    USERS.findByIdAndUpdate(user_id, {
      isBlocked: true,
    })
      .then((result) => {
        console.log("blocked User : ", result);
      })
      .catch((error) => {
        console.log(error);
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

const unblockUser = async (req, res) => {
  try {
    const user_id = req.params.userId;
    console.log("xz", user_id);

    USERS.findByIdAndUpdate(user_id, {
      isBlocked: false,
    })
      .then((result) => {
        console.log("blocked User : ", result);
      })
      .catch((error) => {
        console.log(error);
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
    console.log(error);

    res.status(400);
    throw new Error("Error occcured");
};

})



const adminViewAllDoctors = async (req, res) => {
  try {
    const allDoctors = await DOCTORS.find({ status:"Approved" });
    console.log("view",allDoctors);

    res.json(allDoctors);

  } catch (err) {
    res.status(500).send({
      message: "fetched all doctors failed",
      err,
      success: true,
    });
  }
};

const detailedDoctorVerify = async (req, res) => {
  try {
    console.log("reacheddoc");
    const doctorId = req.params.doctorId;
    console.log("1hhh23", doctorId);

    const allDoctorRequest = await DOCTORS.findOne({ _id: doctorId });

    console.log("222",allDoctorRequest);

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

const approveDoctorRequest = async (req, res) => {
  try {
    console.log("reached");
    const doctorId = req.params.doctorId;
    console.log("123", doctorId);

    const DoctorDetails = await DOCTORS.find({ _id: doctorId });

    console.log("docD", DoctorDetails);

    const userIds = DoctorDetails[0]?.userId;
    console.log("2345", userIds);

    const userDEtailzzzz = await USERS.find({ _id: userIds });

    console.log("23456", userDEtailzzzz);

    await USERS.findByIdAndUpdate(userIds, { isDoctor: true })
      .then((result) => {
        console.log("Updated User : ", result);
      })
      .catch((error) => {
        console.log(error, "error occured while updating...");
      });

    await DOCTORS.findByIdAndUpdate(doctorId, { status: "Approved" })
      .then((result) => {
        console.log("Updated User : ", result);
      })
      .catch((error) => {
        console.log(error, "error occured while updating...");
      });

    const userDetails = await USERS.find({ _id: userIds });

    console.log("m", userDetails);

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
        console.log("Updated Userkk : ", result);
      })
      .catch((error) => {
        console.log(error, "error occured while updating...");
      });

    res.status(200).send({
      message: "Approve As Doctor",
      success:true
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Doctor Approval Failed",
      success: false,
      err,
    });
  }
};

const RejectDoctorAccount = async (req, res) => {
  try {
    console.log("reached");
    const doctorId = req.params.doctorId;
    console.log("123", doctorId);



   await DOCTORS.findByIdAndRemove(doctorId)
    .then((result) => {
      console.log("Removed doctor Apply request : ");
    })
    .catch((error) => {
      console.log(err);
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
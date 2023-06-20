import USER from "../models/userModel.js";
import DOCTOR from '../models/doctorModel.js'
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";
import  Doctor  from "../models/doctorModel.js";
import moment from "moment";
import Appointment from '../models/appointmentModel.js'
import { v4 as uuidv4 } from 'uuid';
import stripe from "stripe";



// @desc    REGISTER user 
// @route   POST /api/users/register
// @access  Public

const registration = asyncHandler(async (req, res) => {
  try {
    console.log("1", req.body);

    const { email, password, name } = req.body;

    const user = await USER.findOne({ email });

    if (user) {
      res.status(200).json({ message: "email already exist", success: false });
    } else {
      const newUser = await USER.create({
        name,
        email,
        password,
      });

      await generateToken(res, newUser._id);

      const userDetails = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isDoctor: newUser.isDoctor,
      };

      res
        .status(200)
        .json({
          message: "registration successfull",
          success: true,
          userDetails,
        });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong", success: false, err });
    console.log("kkk", err);
  }
});

// @desc    Auth User & get Token
// @route   POST /api/users/login
// @access  Public
 
const loginDetails = asyncHandler( async (req, res) => {
  try {
    console.log("1", req.body);

    const { email, password } = req.body;

    const user = await USER.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      await generateToken(res, user._id);

      const userDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isDoctor: user.isDoctor,
       
      };

      res
        .status(200)
        .json({ message: "login successfull", success: true, userDetails });
    } else {
      res.status(200).json({ message: "invalid credentials ", success: false });
    }
  } catch (err) {
    console.log(err);

    res.status(400);
    throw new Error("Error occcured");
  }
});

// @desc    logout user
// @route   POST /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  
  try {
    const cookieParams = {
      httpOnly: true,
      expires: new Date(0),
    };

    res.cookie("jwtToken", "", cookieParams);

    res.status(200).json({ message: "logout successfully", success: true });
  } catch (err) {
    console.log(err);

    res.status(400);
    throw new Error("Error occcured");
  }
});




// @desc    get user Profile
// @route   GET /api/users/profile
// @access  Private






const getUserProfile = asyncHandler(async (req, res) => {

  try {

 
 const user=await USER.findById(req.user._id)

 if(user){

  
    res.status(200).json(fullDetails);

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

// @desc    update user Profile
// @route   PATCH /api/users/profile
// @access  Private 



const updateUserProfile = asyncHandler(async (req, res) => {

  try {

 
    const user=await USER.findById(req.user._id)
   
    if(user){

       user.email=req.body.email || user.email
       user.username=req.body.username || user.username

       if(req.body.password){

        user.password=req.body.password || user.password
       }
   
    const updatedUser= await user.save()

    const updatedUserDetails={

        _id:updatedUser._id,
        email:updatedUser.email,
        password:updatedUser.password,
        username:updatedUser.username
    }

     res.status(200).send({
       success: true,
       updatedUserDetails,
       message: "fetching user data successfully",
     });
    }
   
    else {
   
     res.status(200).send({
       success: false,
       message: "you are not authorized to do this.",
     });
    }
   
     
       
     } catch (error) {
       console.log(err);
   
       res.status(400);
       throw new Error("Error occcured");
};


})


// @desc    apply for doctor account
// @route   POST /api/users/applyfordoctoracc
// @access  Public

const applyForDoctorAccount= async (req, res) => {

  console.log("qwerty",req.body)

  const userId=req.user._id

  const { firstName,lastName, phoneNumber,website, address,city,state,zipCode,specialization,experience,feePerCunsultation,image,cimage,timings,clinicName,clinicLocation}=req.body
  
    try {
  
  
    const newdoctor=await DOCTOR.create({
  
      firstName,
      lastName,
      phoneNumber,
      website,
      address,
      city,
      state,
      zipCode,
      specialization,
      experience,
      feePerCunsultation,
      timings,
      userId,
      clinicName,
      clinicLocation,
      image,cimage,
      status: "pending"
  
    })
  
  
          console.log("qqq0471",req.body)
       console.log("reached...man.");
       console.log("33211",req.user._Id);
   
  
      
       
  console.log("1234",newdoctor)
        
        
  console.log("1okk34",newdoctor._id)
  
      const adminUser = await USER.findOne({ isAdmin: true });
  
      const unseenNotifications = adminUser?.unseenNotifications;
      unseenNotifications?.push({
        type: "new-doctor-request",
        message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
        data: {
          doctorId: newdoctor._id,
          name: newdoctor.firstName + " " + newdoctor.lastName,
        },
        onClickPath: "/admin/doctorslist",
      });
      await USER.findByIdAndUpdate(adminUser._id, { unseenNotifications });
      res.status(200).json({
        success: true,
        message: "Doctor account applied successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
  


  const markAllAsSeen=async (req, res) => {
    try {

      console.log("22222reached",req.user);

      const user = await USER.findOne({ _id: req.user._id});
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications?.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }


  const deleteAllNotifications = async (req, res) => {
    try {
      console.log("4444helloreached");
      const user = await USER.findOne({ _id: req.user._id });
      user.seenNotifications = [];
      user.unseenNotifications = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications cleared",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error clearing notifications",
        success: false,
        error,
      });
    }
  };
  
  

  const getApprovedDoctorsList=async (req, res) => {


    try {
            
      
  
      const getApprovedDoctors = await DOCTOR.find({ status: "Approved" });
  
      console.log("8777", getApprovedDoctors);
  
      res.status(200).send(
        getApprovedDoctors,
      );
    } catch (err) {
      res
        .status(500)
        .send({ message: "cannot fetch approved doctors", success: false, err });
    }
  };
  
  const getDoctorDetails = async (req, res) => {
   
    console.log("224466",req.params.id);
   
  
  
    try {
      const doctor = await Doctor.findOne({_id: req.params.id });  
      console.log("444",doctor)
      res.status(200).json(
         doctor,
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting doctor info", success: false, error });
    }
  };
  
  
  const BookAppointmentz= async (req, res) => {
    try {

console.log('34555',req.body)


      req.body.status = "pending";
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm").toISOString();
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      //pushing notification to doctor based on his userid
      const user = await USER.findOne({ _id: req.body.doctorInfo.userId });
      user.unseenNotifications.push({
        type: "new-appointment-request",
        message: `A new appointment request has been made by ${req.body.userInfo.name}`,
        onClickPath: "/doctor/appointments",
      });
      await user.save();
      res.status(200).send({
        message: "Appointment booked successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking appointment",
        success: false,
        error,
      });
    }
  };


const   onlineBookAppointmentz=async (req, res) => {
  try {

console.log("okkShefeeq",req.body.token)

    const customer =await stripe.customers.create({
      email:req.body.token.email,
      source:req.body.token.id
    })
    const payment =await stripe.paymentIntents.create({
      amount:req.body.doctorInfo.feePerCunsultation*100,
      currency:'usd',
      customer:customer.id,
      receipt_email:req.body.token.email
    },{
      idempotencyKey:uuidv4(),
    }
    )
    if(payment){

      

    req.body.paymentStatus="done"
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body); 
    await newAppointment.save();
  

    const user = await Users.findOne({ _id: req.body.doctorInfo.userId });
    user?.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.username}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    }) };

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};




const  checkAvailiabilty=async (req, res) => {   

  console.log("reached",req.body);
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.id;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });

console.log("777",appointments);

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};



const getUserAppointments=async (req, res) => {

  console.log("122111", req.user._id );

  

  try {
    const appointments = await Appointment.find({ userId:req.user._id});
    res.status(200).json(
    
       appointments
    );

console.log("9999",appointments);


  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}




const searchDoctors = async (req, res) => {
  console.log("reach12ok");

  const capitalizedDoctorName = req.body.query.charAt(0).toUpperCase() + req.body.query.slice(1);

  console.log("234", capitalizedDoctorName)

  try {
    const docs = await DOCTOR.findOne({ firstName: capitalizedDoctorName });
    console.log("Result :", docs);
    if (!docs) {
      res.status(200).send({ success: false, message: "Doctor not found" });
      return;
    }
    res.status(200).json( docs );
  } catch (err) {
    console.log(err);
    res.status(500).send({ err, success: false });
  }
};




const getBlogs = async (req, res) => {
  try {
    res.status(200).send({
      message: "user updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating profile",
      success: false,
      error,
    });
  }
};

const getDetailedBlogs = async (req, res) => {
  console.log("4322", req.params.blogId);

  try {
    res.status(200).send({
      message: "blog fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating profile",
      success: false,
      error,
    });
  }
};

const cancelAppointment = async (req, res) => {

  console.log("678",req.body)
  try {
    console.log("backendreached")
    const appointment = await Appointment.findById(req.body.recordid);
    if (!appointment) {
      return res.status(404).send({
        message: "Appointment not found",
        success: false,
      });
    }
    if (appointment.paymentStatus === "done") {
      return res.status(400).send({
        message: "Cannot cancel appointment. Payment already done.",
        success: false,
      });
    }
    await Appointment.deleteOne({ _id: appointment._id });
    res.status(200).send({
      message: "Appointment cancelled successfully",
      success: true, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error cancelling appointment",
      success: false,
      error,
    });
  }
};

  

export {
  registration,
  loginDetails,
  logoutUser,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
  BookAppointmentz,
  onlineBookAppointmentz,
  checkAvailiabilty,
  getUserAppointments,
  getUserProfile,
  updateUserProfile,
  searchDoctors,
  getBlogs,
  getDetailedBlogs,
  cancelAppointment,
  getDoctorDetails
};

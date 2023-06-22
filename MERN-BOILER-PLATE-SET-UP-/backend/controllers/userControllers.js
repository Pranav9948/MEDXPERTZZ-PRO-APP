import USER from "../models/userModel.js";
import DOCTOR from "../models/doctorModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Doctor from "../models/doctorModel.js";
import moment from "moment";
import Appointment from "../models/appointmentModel.js";
import { v4 as uuidv4 } from "uuid";
import stripe from "stripe";
import notes from "../models/noteModel.js";

// @desc    REGISTER user
// @route   POST /api/users/register
// @access  Public

const registration = asyncHandler(async (req, res) => {
  try {
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

      res.status(200).json({
        message: "registration successfull",
        success: true,
        userDetails,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong", success: false, err });
  }
});

// @desc    Auth User & get Token
// @route   POST /api/users/login
// @access  Public

const loginDetails = asyncHandler(async (req, res) => {
  try {
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
        unseenNotifications:user.unseenNotifications
      };

      res
        .status(200)
        .json({ message: "login successfull", success: true, userDetails });
    } else {
      res.status(200).json({ message: "invalid credentials ", success: false });
    }
  } catch (err) {
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
    res.status(400);
    throw new Error("Error occcured");
  }
});

// @desc    get user Profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await USER.findById(req.user._id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).send({
        success: false,
        message: "you are not authorized to view this.",
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error occcured");
  }
});

// @desc    update user Profile
// @route   PATCH /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await USER.findById(req.user._id);

    if (user) {
      user.email = req.body.email || user.email;
      user.name = req.body.name || user.name;

      if (req.body.password) {
        user.password = req.body.password || user.password;
      }

      const updatedUser = await user.save();

      const updatedUserDetails = {
        _id: updatedUser._id,
        email: updatedUser.email,
        password: updatedUser.password,
        username: updatedUser.username,
      };

      res.status(200).send({
        success: true,
        updatedUserDetails,
        message: "fetching user data successfully",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "you are not authorized to do this.",
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error occcured");
  }
});

// @desc    apply for doctor account
// @route   POST /api/users/applyfordoctoracc
// @access  Public

const applyForDoctorAccount = async (req, res) => {
  const userId = req.user._id;

  const {
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
    image,
    cimage,
    timings,
    clinicName,
    clinicLocation,
  } = req.body;

  try {
    const newdoctor = await DOCTOR.create({
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
      image,
      cimage,
      status: "pending",
    });

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
    res.status(500).json({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};


// @desc    mark all as seen
// @route   POST /api/users/mark-all-notifications-as-seen
// @access  Private


const markAllAsSeen = async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.user._id });
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
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

// @desc    delete all as notifications
// @route   DELETE /api/users/delete-all-notifications
// @access  Private


const deleteAllNotifications = async (req, res) => {
  try {
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
    res.status(500).send({
      message: "Error clearing notifications",
      success: false,
      error,
    });
  }
};


// @desc    getApprovedDoctorsList
// @route   GET /api/users/getAllApprovedDoctors
// @access  Public


const getApprovedDoctorsList = async (req, res) => {
  try {

    console.log('reac')
    const getApprovedDoctors = await DOCTOR.find({ status: "Approved" });
    console.log('23',getApprovedDoctors)

    res.status(200).send(getApprovedDoctors);
  } catch (err) {

    console.log(err);
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }
};

// @desc    getDoctorDetails
// @route   GET /api/users/getdoctordetails
// @access  Public



const getDoctorDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });

    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting doctor info", success: false, error });
  }
};


// @desc    BookAppointmentz
// @route   POST /api/users/book-appointment
// @access  Private




const BookAppointmentz = async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await USER.findOne({ _id: req.body.doctorInfo.userId });
    user?.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user?.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};


// @desc    onlineBookAppointmentz
// @route   POST /api/users/onlinebook-appointment
// @access  Private




const onlineBookAppointmentz = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.token.email,
      source: req.body.token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: req.body.doctorInfo.feePerCunsultation * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: req.body.token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      req.body.paymentStatus = "done";
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
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};


// @desc    checkAvailiabilty
// @route   POST /api/users/check-booking-avilability
// @access  Private



const checkAvailiabilty = async (req, res) => {
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
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};


// @desc    getUserAppointments
// @route   GET /api/users/get-appointments-by-user-id
// @access  Private



const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
};


// @desc    searchDoctors
// @route   GET /api/users/search-doctors
// @access  Public




const searchDoctors = async (req, res) => {
  const capitalizedDoctorName =
    req.body.query.charAt(0).toUpperCase() + req.body.query.slice(1);

  try {
    const docs = await DOCTOR.findOne({ firstName: capitalizedDoctorName });

    if (!docs) {
      res.status(200).send({ success: false, message: "Doctor not found" });
      return;
    }
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).send({ err, success: false });
  }
};




// @desc    getBlogss
// @route   GET /api/users/getblogs
// @access  Public






const getBlogs = async (req, res) => {
  try {
    const notez = await notes.find({});

    res.status(200).json(notez);
  } catch (error) {
    res.status(500).send({
      message: "Error getting note",
      success: false,
      error,
    });
  }
};



// @desc    getDetailedBlogs
// @route   GET /api/users/getdetailedblog/:blogId
// @access  Public





const getDetailedBlogs = async (req, res) => {
  try {
    const notez = await notes.find({ _id: req.params.blogId });

    res.status(200).json(notez);
  } catch (error) {
    res.status(500).send({
      message: "Error updating profile",
      success: false,
      error,
    });
  }
};


// @desc    cancelAppointment
// @route   POST /api/users/cancelappointment
// @access  Private






const cancelAppointment = async (req, res) => {
  try {
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
  getDoctorDetails,
};

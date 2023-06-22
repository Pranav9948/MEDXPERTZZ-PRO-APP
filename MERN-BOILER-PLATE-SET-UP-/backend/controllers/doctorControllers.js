import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import Users from "../models/userModel.js";
import Note from "../models/noteModel.js";


// @desc    getDoctorInfoById
// @route   GET /api/users/get-doctor-info-by-user-id
// @access  Private,DOCTOR   





const getDoctorInfoById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
};


// @desc   updateDoctorProfile
// @route   PATCH /api/users/update-doctor-profile
// @access  Private,,DOCTOR



const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
};


// @desc   getAppointmentOfDoctor
// @route   PATCH /api/users/get-appointments-by-doctor-id
// @access  Private,DOCTOR





const getAppointmentOfDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });
    const appointments = await Appointment.find({ doctorId: doctor._id });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
};


// @desc   changeAppointmentStatus
// @route   POST /api/users/change-appointment-status
// @access  Private,DOCTOR




const changeAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await Users.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
};


// @desc   createBlogs
// @route   POST /api/users/create
// @access  Private,DOCTOR


const createBlogs = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content || !image) {
      res
        .status(200)
        .send({ message: "Please Fill all the feilds", success: false });

      return;
    } else {
      const note = new Note({ doctor: req.user._id, title, content, image });

      const createdNote = await note.save();

      res
        .status(200)
        .json({ message: "note created successfully", success: true });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error  doctor blogs", success: false, error });
  }
};


// @desc   getDoctorBlogs
// @route   GET /api/users/getdoctorblog
// @access  Private,DOCTOR


const getDoctorBlogs = async (req, res) => {
  try {
    const doctor = await Note.find({ doctor: req.user._id });
    res.status(200).json(doctor);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor blogs", success: false, error });
  }
};



// @desc   editDoctorBlogs
// @route   GET /api/users/editBlog/:blogId
// @access  Private,DOCTOR


const editDoctorBlogs = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const note = await Note.findById(req.body.blogId);

    if (note.doctor.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }

    if (note) {
      note.title = title;
      note.content = content;
      note.pic = image;

      const updatedNote = await note.save();

      res.json({
        updatedNote,
        success: true,
        message: "notes updated succesfully",
      });
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } catch (err) {}
};

// @desc   DeleteNote
// @route   DELETE /api/users/deleteBlog/:blogId
// @access  Private,DOCTOR


const DeleteNote = async (req, res) => {
  const note = await Note.findById(req.params.blogId);

  if (note.doctor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await Note.deleteOne({ _id: req.params.blogId });

    res.json({ message: "Note Removed", success: true });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
};

export {
  getDoctorInfoById,
  updateDoctorProfile,
  getAppointmentOfDoctor,
  changeAppointmentStatus,
  createBlogs,
  getDoctorBlogs,
  editDoctorBlogs,
  DeleteNote,
};

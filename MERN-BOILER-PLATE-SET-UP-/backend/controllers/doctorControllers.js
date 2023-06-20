import  Doctor  from "../models/doctorModel.js";
// import { Appointment } from "../models/appointmentModel.js";
import  Users  from "../models/userModel.js";
// import Note  from '../models/noteModel.js';



  const getDoctorInfoById = async (req, res) => {

console.log("512ok",req.body.doctorId );

   try {
     const doctor = await Doctor.findOne({ userId: req.body.userId });
     res.status(200).send({
       success: true, 
       message: "Doctor info fetched successfully",
       data: doctor,
     });
   } catch (error) {
     res
       .status(500)
       .send({ message: "Error getting doctor info", success: false, error });
   }
 };





 
   const updateDoctorProfile= async (req, res) => {
     try {

      
console.log("511okk",req.body.doctorId );

        console.log("555Reached");

       const doctor = await Doctor.findOneAndUpdate(
         { userId:req.body.doctorId },
         req.body
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



const  getAppointmentOfDoctor=async (req, res) => {
  try {

    
console.log("512okk",req.body.doctorId );

    const doctor = await Doctor.findOne({ userId: req.body.doctorId});
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}


const changeAppointmentStatus= async (req, res) => {
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
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
}


const createBlogs = async (req, res) => {

  console.log("7899");
  const { title, content,pic } = req.body;
  console.log("4355",title,content,pic)

  if (!title || !content || !pic) {
    res.status(200).send({message:"Please Fill all the feilds",success:false})
   
    return;
  } else {
    const note = new Note({ doctor: req.body.doctorId,title,content,pic });

    const createdNote = await note.save();
    console.log("created....")

    res.status(200).send({message:"note created successfully",success:true})
  }
}; 


const getDoctorBlogs=async (req, res) => {


  console.log("512ok",req.body.doctorId); 

  try {
    const doctor = await Note.find({doctor: req.body.doctorId });
    res.status(200).send({
      success: true, 
      message: "Doctor blogs fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor blogs", success: false, error });
  }

  
}; 


const editDoctorBlogs=(async (req, res)=>{

  console.log("4333reached")

    const { title, content, pic } = req.body;
  
    const note = await Note.findById(req.params.blogId);
  
    if (note.doctor.toString() !== req.body.doctorId.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      note.title = title;
      note.content = content;
      note.pic = pic;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });



const DeleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.doctor.toString() !== req.body.doctorId.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
};







 export  {
  getDoctorInfoById,
  updateDoctorProfile,
  getAppointmentOfDoctor,
  changeAppointmentStatus,
  createBlogs,
  getDoctorBlogs,
  editDoctorBlogs,
  DeleteNote
 };
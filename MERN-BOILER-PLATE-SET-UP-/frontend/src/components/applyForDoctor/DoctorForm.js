

import React, { useState } from "react";
import { DatePicker, Checkbox } from "antd";
import dayjs from 'dayjs';

import '../../styles/components/user/doctorForm.css'
import '../../styles/pages/user/userapplyasdoctor.css'

import { Button, Col, Form, Input, Row,Upload } from "antd";
import { TimePicker } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";


import Container from "react-bootstrap/esm/Container";
import { useApplyForDoctorAccountMutation, useUploadImageMutation } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import Gif from "../Gif";
import Message from "../Message";








function DoctorForm({ onFinish, initivalValues }) {


  const userInfo = useSelector((state) => state.userlogin?.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { RangePicker } = DatePicker;
  const [to, setTo] = useState();
  const [from, setFrom] = useState()
  const [totalHours, setTotalHours] = useState(0);
  const [image, setImage] = useState([]);
  const [cimage, setCimage] = useState([]);
 



   
  const [applyForDoctorAccount,{isLoading,isError}]=useApplyForDoctorAccountMutation()
  const [uploadImage,{isLoading:imgLoading,isError:imgError}]=useUploadImageMutation()

   

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log('123',image,cimage)
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
   
    values.from = from; 
    values.to = to;
   
     values.timings = [from, to];
      


      try {
   
         console.log('values',values)

          const {data}=await applyForDoctorAccount({...values,image,cimage})

           if(data.success){

              toast.success(data.message)
              navigate("/successapplyfordoctor");
           }


           else{

              toast.error(data.message)

           }
         

       


      } catch (err) {
       
        console.log("2111",err) 
        toast(err?.data?.message || err.error);
       
      }

  };
  
  

  function selectTimeSlots(values) {
    console.log(values);
    console.log(values[0].format(" HH:mm"));
    console.log(values[1].format("HH:mm"));
    setFrom(values[0].format(" HH:mm"));
    setTo(values[1].format(" HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }
  
  








const [firstName, setFirstName] = useState('');
const [firstNameError, setFirstNameError] = useState('');



const [lastName, setLastName] = useState('');
const [lastNameError, setLastNameError] = useState('');


const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [specialization, setSpecialization] = useState('');
  const [specializationError, setSpecializationError] = useState('');

  const [experience, setExperience] = useState("");
  const [experienceError, setExperienceError] = useState("");


  const [website, setWebsite] = useState('');
  const [websiteError, setWebsiteError] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');


  const [clinicLocation, setclinicLocation] = useState('');
  const [clinicLocationError, setClinicLocationError] = useState('');


  const [clinicName, setclinicName] = useState('');
  const [clinicNameError, setClinicNameError] = useState('');


  const [fee, setFee] = useState("");
  const [feeError, setFeeError] = useState("");





  function handleInputChangeW(event) {
    const value = event.target.value;
    setWebsite(value);
    setWebsiteError(validateWebsite(value));
  }



  function validateWebsite(website) {
    if (!website) {
      return "Website is required";
    }
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(website)) {
      return "Please enter a valid website address starting with 'http://' or 'https://'";
    }
    return "";
  }




 



  const 
  handleInputChangeEE = (event) => {
    const value = event.target.value;
    if (value < 0) {
      setExperienceError("experience must be a positive number.");
      setExperience(0);
    } else {
      setExperienceError("");
      setExperience(value);
    }
  };





  const handleInputChangeF = (event) => {
    const value = event.target.value;
    if (value < 0) {
      setFeeError("Fee per consultation must be a positive number.");
      setFee(0);
    } else {
      setFeeError("");
      setFee(value);
    }
  };


function  validateFirstName(firstName) {
  if (!firstName) {
    return "First name is required";
  }
  if (!/^[A-Za-z]+$/.test(firstName)) {
    return "Please enter a valid first name";
  }
  return "";
}


function validateLastName(lastName) {
  if (!lastName) {
    return "last name is required";
  }
  if (!/^[A-Za-z]+$/.test(lastName)) {
    return "Please enter a valid last name";
  }
  return "";
}



function handleInputChange(event) {
  const value = event.target.value;
  setFirstName(value);
  setFirstNameError(validateFirstName(value));
}



 

function  handleInputChangePh(event) {
  const value = event.target.value;
  setMobile(value);
  setMobileError(validatePhoneNumber(value));
}


function handleInputChanges(event) {
  const value = event.target.value;
  setLastName(value);
  setLastNameError(validateLastName(value));
}



function handleInputChangess(event) {
  const value = event.target.value;
  setSpecialization(value);
  setSpecializationError(validateSpecialization(value));
}


function handleInputChangeCL(event) {
  const value = event.target.value;
  setclinicLocation(value);
  setClinicLocationError(validateClinicLocation(value));
}



function handleInputChangeCN(event) {
  const value = event.target.value;
  setclinicName(value);
  setClinicNameError(validateClinicName(value));
}




  function  validateSpecialization(specialization) {
    if (!specialization) {
      return "specialization is required";
    }
    if (!/^[A-Za-z]+$/.test(specialization)) {
      return "Please enter specialized field only";
    }
    return "";
  }



  function  validateClinicLocation(clinicLocation) {
    if (!clinicLocation) {
      return "clinicLocation is required";
    }
    if (!/^[A-Za-z]+$/.test(clinicLocation)) {
      return "Please enter clinicLocation field correctly";
    }
    return "";
  }


  function  validateClinicName(clinicName) {
    if (!clinicName) {
      return "clinicName is required";
    }
    if (!/^[A-Za-z]+$/.test(clinicName)) {
      return "Please enter clinic Name field correctly";
    }
    return "";
  }


  function  validatePhoneNumber(phoneNumber) {
   
   console.log('phone',phoneNumber)
    if (!phoneNumber) {
      return "Phone number is required";
    } 

  
    return "";
  }

  function validateFirstName(firstName) {
    if (!firstName) {
      return "First name is required";
    }
    if (!/^[A-Za-z]+$/.test(firstName)) {
      return "Please enter a valid first name";
    }
    return "";
  }



  const uploadFileHandler=async(e)=>{

    const formData=new FormData()



    formData.append('image',e.target.files[0])

    try{


           const res=  await uploadImage(formData).unwrap()
           console.log("res",res)
           toast.success(res.message)
           setImage(res.image)

    }

    catch(err){

     console.log(err)
     toast.error(err?.data.message||err.error)

    }
  }

  const uploadDocFileHandler=async(e)=>{

    const formData=new FormData()
 
    

    formData.append('image',e.target.files[0])

    try{


           const res=  await uploadImage(formData).unwrap()
           console.log("res",res)
           toast.success(res.message)
           setCimage(res.image)

    }

    catch(err){

     console.log(err)
     toast.error(err?.data.message||err.error)

    }
  }
   
  

  return (

    <>
   

    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (


    <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <div className="grid-container">
      <div>

      <h1 className="card-title mt-3 mb-5">Personal Information</h1>
      
   

      <div>
      <label htmlFor="firstName" >First Name</label>
      <input 
        type="text" 
        id="firstName" 
        name="firstName" 
        required 
        placeholder="First Name" 
        pattern="[A-Za-z]+" 
        value={firstName} 
        onChange={handleInputChange} 
      />
      <span className={firstNameError ? "error-message" : "hidden"} style={{color:'red'}}>{firstNameError}</span>
    </div>



    
      <div>
        <label>Last Name</label>


        <input 
        type="text" 
        id="lastName" 
        name="lastName" required placeholder="Last Name" 
        pattern="[A-Za-z]+" 
        value={lastName} 
        onChange={handleInputChanges} 
      />
      <span className={lastNameError ? "error-message" : "hidden"} style={{color:'red'}}>{lastNameError}</span>
    </div>



    <div>
  <label htmlFor="phoneNumber">Phone Number</label>
  <input 
    type="tel"
    id="phoneNumber"
    name="phoneNumber"
   
    placeholder="Phone Number"
    pattern="[0-9]{10}"
    value={mobile}
    onChange={handleInputChangePh}
    style={{marginTop:'20px',marginBottom:'20px'}}
  />
  <span className={phoneNumberError ? "error-message" : "hidden"} style={{color:'red'}} >{phoneNumberError}</span>
</div>








      <div>
      <label htmlFor="website">Website</label>
      <input 
        type="url" 
        id="website" 
        name="website" 
        required 
        placeholder="https://example.com" 
        value={website} 
        onChange={handleInputChangeW} 
      />
      <span className={websiteError ? "error-message" : "hidden"} style={{color:'red'}}>{websiteError}</span>
    </div>




      <div>
        <label>Address</label>
        <input type="text" name="address" required placeholder="Address" />
        <input type="text" name="city" required placeholder="City" />
        <input type="text" name="state" required placeholder="State" />
        <input type="text" name="zipCode" required placeholder="Zip Code" />
      </div>
      <hr />
      </div> 
      <div>
      <h1 className="card-title mt-3 mb-5">Professional Information</h1>
      <div>
        <label>Specialization</label>
        <input 
        type="text" name="specialization" required placeholder="Specialization"
        id="specialization"
        pattern="[A-Za-z]+" 
        value={specialization} 
        onChange={handleInputChangess} 
      />
      <span className={specializationError ? "error-message" : "hidden"} style={{color:'red'}}>{specializationError}</span>
      </div>
      <div>
        <label>Experience</label>
        <input
          type="number"
          name="experience"
          required
          placeholder="Experience"
          onChange={handleInputChangeEE}
          value={experience}
         
        />
  {experienceError && <span style={{ color: "red" }}>{experienceError}</span>}
        
      </div>
      <div>
        <label>Fee Per Consultation</label>
        <input
          type="number"
          name="feePerCunsultation"
          value={fee}
          onChange={handleInputChangeF}
          required
          placeholder="Fee Per Consultation"
        />
        {feeError && <span style={{ color: "red" }}>{feeError}</span>}
      </div>


      
      <div>
        <label>clinic Name</label>
        <input 
        type="text" name="clinicName" required placeholder="clinic Name"
        id="clinicName"
        pattern="[A-Za-z]+" 
        value={clinicName} 
        onChange={handleInputChangeCN} 
   
      />
      <span className={clinicNameError ? "error-message" : "hidden"} style={{color:'red'}}>{clinicNameError}</span>
      </div>



      <div>
        <label>clinic Location</label>
        <input 
        type="text" name="clinicLocation" required placeholder="clinicLocation"
        id="clinicLocation"
        pattern="[A-Za-z]+" 
        value={clinicLocation} 
        onChange={handleInputChangeCL} 
   
      />
      <span className={clinicLocationError ? "error-message" : "hidden"} style={{color:'red'}}>{clinicLocationError}</span>
      </div>


    

  <RangePicker
  className="mx-4 mb-4 p-5 fw-bold"
  picker="time"
  format="HH:mm"
  onChange={selectTimeSlots}
/>



<div className="form-outline mb-4">
                <input   type="file" id="formuploads" name="images" className="form-control" onChange={uploadFileHandler}  />
                <label className="form-label" htmlFor="form4Example">Doctor Image</label>
            </div>

            <img className="img-fluid" src={image} alt="" />

            </div>



            <div className="form-outline mb-4">
                <input   type="file" id="cformupload" name="Cimage" className="form-control" onChange={uploadDocFileHandler}   />
                <label className="form-label" htmlFor="form4Example2">DoctorCertificate</label>
            </div>

            <img className="img-fluid" src={cimage} alt="" />

            </div>

      
      <div className="d-flex justify-content-center">
        <button type="submit" className="primary-button applyDocBtn fs-2 fw-bold text-white bg-success" style={{height:'75px',width:"300px"}}>
          SUBMIT
        </button>

      </div>
      
    </form>
    )}
    </>
  );
};


export default DoctorForm;










//  import axiosConfig from "../../../axiosConfig";

// const DoctorForm = () => {

//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     // const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [bookedTimeSlots, setbookedTimeSlots] = useState([])
//     const [image, setImage] = useState([]);
// const [rentPerHour, setrentPerHour] = useState('')
// const [capacity, setcapacity] = useState('')
// const [fuelType, setfuelType] = useState('')
//     //categories from the backend


    
//     //handle and convert it in base 64
//     const handleImage = (e) =>{
//         const file = e.target.files[0];
//         setFileToBase(file);
//         console.log(file);
//     }

//     const setFileToBase = (file) =>{
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () =>{
//             setImage(reader.result);
//         }

//     }
    
//     const submitForm = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await axiosConfig.post('/api/users/apply-doctor-account', {
//             name,
//             description,
//             image,
//             rentPerHour,
//             capacity,
//             fuelType,
//             bookedTimeSlots
//           }, {
            
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`
//             }
//           });
//           console.log(response.data);
//           setName('');
//           setDescription('');
//           setCategory('');
//           setImage('');
//           setrentPerHour('');
//           setcapacity('');
//           setfuelType('');
//           setbookedTimeSlots('');
//           toast.success('product created successfully');
//         } catch (error) {
//           console.error(error);
//         }
//       };
//   return (
//    <>

//      <div className="container custom_class">
//         <h2 className="signup_title " style={{textAlign:'center',paddingTop:"90px"}}>ADD CAR</h2>
//         <form className=" col-sm-6 offset-3 pt-5 signup_form " encType="multipart/form-data" onSubmit={submitForm}>
            
//             <div className="form-outline mb-4">
//                 <input onChange={(e)=>setName(e.target.value)} type="text" id="form4Example1" className="form-control"  value={name}/>
//                 <label className="form-label" htmlFor="form4Example1">Name</label>
//             </div>


//             <div className="form-outline mb-4">
//                 <textarea  onChange={(e)=>setDescription(e.target.value)}   type="text" id="form4Example2" className="form-control"  value={description}/>
//                 <label className="form-label" htmlFor="form4Example2">Description </label>
//             </div>

           

//             <div className="form-outline mb-4">
//                 <input  onChange={(e)=>setrentPerHour(e.target.value)}  type="number" id="form4Example4" className="form-control"   value={rentPerHour}/>
//                 <label className="form-label" htmlFor="form4Example2">Rent per hour </label>
//             </div>

//             <div className="form-outline mb-4">
//                 <input  onChange={(e)=>setcapacity(e.target.value)}  type="number" id="form4Example4" className="form-control"   value={capacity}/>
//                 <label className="form-label" htmlFor="form4Example2">capacity </label>
//             </div>

//             <div className="form-outline mb-4">
//                 <input  onChange={(e)=>setfuelType(e.target.value)}  type="text" id="form4Example4" className="form-control"   value={fuelType}/>
//                 <label className="form-label" htmlFor="form4Example2">fuelType </label>
//             </div>

//             <div className="form-outline mb-4">
//                 <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
//                 <label className="form-label" htmlFor="form4Example2">Image</label>
//             </div>

//             <img className="img-fluid" src={image} alt="" />
//             <button  type="submit" className="btn btn-primary btn-block mb-4">Create</button>
            
//          </form>
//     </div> 
//    </>
//   )
// }

// export default DoctorForm
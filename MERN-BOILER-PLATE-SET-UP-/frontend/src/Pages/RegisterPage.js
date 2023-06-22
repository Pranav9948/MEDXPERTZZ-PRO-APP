
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import '../styles/pages/register.css';
import { Button, Form } from 'react-bootstrap';
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import logos from '../images/doctor-gif.gif'
import { useUserRegisterMutation } from '../redux/slices/userSlice';






const RegisterPage = () => {

  const [register,{isLoading,isError}]=useUserRegisterMutation()




    const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


 

     const dispatch=useDispatch()
      const navigate=useNavigate()

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    //validate username

    if (!name) {
      setNameError("name is required");
    } else if (!usernameRegex.test(name)) {
      setNameError("Please enter a valid username");
    } else {
      setNameError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 6 characters, including uppercase, lowercase, and a number"
      );
    } else {
      setPasswordError("");
    }


    if (!confirmPassword) {
      setConfirmPasswordError(" confirm Password is required");
    } else if (password!==confirmPassword) {
        setConfirmPasswordError(
        "Password mismatch plz check"
      );
    } else {
        setConfirmPasswordError("");
    }





    // Perform further actions if form is valid
    if (
       password === confirmPassword &&
      password &&
      email &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      name &&
      usernameRegex.test(name)



    ) {
      try {

          
         const {data}= await register({name,email,password})

           console.log('45',data)

         if(data?.success){
           
          toast.success(data.message)
          navigate('/login')
           
         }

         else{

           toast.error(data.message)
         }

       
       
        
              


      } catch (err) {

        console.log(err)
        toast.error(err?.data?.message|| err?.error)
      }
    }
  };
















  return (
    <div className='backgroundRegister'>
      <MDBContainer className="my-5">
        <MDBCard className='registerScreen'>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage
                src={logos}
                alt="login form"
                
                className='rounded-start w-100 h-full'
              />
            </MDBCol>


           
            <MDBCol md='1' ></MDBCol>


            <MDBCol md='5' >
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2 align-items-center'>
                <h1 className="fw-bold mb-0 text-center logoTexts text-yellow-600 fs-1 ps-3 pt-10">
                    <span><i class="fa-solid fa-user-doctor me-3 text-red-400"></i></span>
                  MedXpertz</h1>
                   </div>
                <h3 className="fw-bold fs-4 text-blue-700 my-4 pb-3 pt-5" style={{ letterSpacing: '1px' }}>
                  Register into your account
                </h3>

                <div>
      
       
        
        <Form className="login-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label className="text-dark fw-bold mb-2">User Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">
              {nameError && nameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-dark fw-bold mb-2">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError && emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm1.ControlInput1">
            <Form.Label className="text-dark fw-bold mb-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError && passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm1.ControlInput2">
            <Form.Label className="text-dark fw-bold mb-2">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!confirmPasswordError}
            />
            <Form.Control.Feedback type="invalid">
              {confirmPasswordError && confirmPasswordError}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Button variant="danger" className="mb-5 mt-3 bg-red-400 text-white w-full h-16" type="submit">
            Register
          </Button>
          <Link to='/login'><span className="text-blue-600">Already have an account ? Login </span></Link>
        </Form>
       
    </div>
               
               
              </MDBCardBody>
            </MDBCol>

            
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default RegisterPage;

import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import logos from '../images/doctLogin.gif'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserLoginMutation } from '../redux/slices/userSlice'
import { setCredentials } from '../redux/slices/authSlice'

  

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [login, {isLoading,isError}]= useUserLoginMutation()

  const {userDetails}=useSelector((state)=>state.auth)


  useEffect(()=>{

    if(userDetails!==null){

       navigate('/')
    }
  },[navigate,userDetails])



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

    // Perform further actions if form is valid
    if (
      email &&
      password &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      try {
        console.log(email, password);

        const res = await login({email,password}).unwrap()
 
         console.log('res',res)


          

          if(res.success){

            dispatch(setCredentials({...res.userDetails}))
            toast.success("login successfully");
            navigate("/");
          }

          else {

            toast.error(res.message);

          }

      
      } catch (err) {
        toast(err?.data?.message || err.error);
        console.log("err", err);
        navigate('/login')
        
      }
    }
  };








  return (
    <div className='backgroundLogin'>
      <MDBContainer className="my-5">
        <MDBCard className='LoginScreen'>
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
                  Login into your account
                </h3>

                <div>
      
       
                <Form className="login-form" onSubmit={handleFormSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-white mb-2">
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm1.ControlInput1"
                >
                  <Form.Label className="text-white mb-2">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="danger"
                  className=" mt-3 loginBtn bg-red-500 text-white w-full h-10"
                  type="submit"
                >
                  Login
                </Button>
              </Form>

              <Link to='/register'><span className="text-blue-600 mb-5">Dont have an account ? Register </span></Link>
       
       
    </div>
               
               
              </MDBCardBody>
            </MDBCol>

            
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default LoginPage

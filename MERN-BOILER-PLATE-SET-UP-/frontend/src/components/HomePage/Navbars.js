import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import '../../styles/components/navbar.css'
import logo from '../../images/doctor-gif.gif'
import  {LinkContainer}from 'react-router-bootstrap'
import { useLogoutMutation } from "../../redux/slices/userSlice";
import { removeCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";


function Navbars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   
          const  [logout,{isLoading,isError}]  =    useLogoutMutation()

  const linkStyle = {
    textDecoration: "none",
  };

  const {userDetails}=useSelector((state)=>state.auth)


 
 
  const logoutHandler=async()=>{

    
   const res= await logout().unwrap()

   console.log('123',res)

   if(res.success){
 console.log('loggging out')
      toast.success(res.message)
      dispatch(removeCredentials())
      navigate('/login')
   }



  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ marginRight: "100px", fontSize: "10px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
           <h2 className="logoText text-green-500 ps-4">MedXpertz</h2>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Appointments"
              id="basic-nav-dropdown"
              style={{ fontSize: "15px" }}
            >
              <NavDropdown.Item>
                <Link
                  to={"/view-appointments"}
                  style={{ textDecoration: "none" }}
                >
                  view your appointments{" "}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to="/viewourdoctors"
              style={{ textDecoration: "none" }}
              className="mt-2"
            >
               Doctors
            </Link>
            <NavDropdown title="Health Blogs" id="basic-nav-dropdown">
              <Link
                to="/getallblogs"
                style={{ textDecoration: "none" }}
                className="mt-2"
              >
                Read Health Blogs
              </Link>
            </NavDropdown>
            <Nav.Link className="d-flex " style={{ marginTop: "-10px" }}>
              {" "}
              <div>
                <i className="ri-notification-line header-action-icon px-1"></i>{" "}
              </div>
              <div>


            

                <Badge
                 
                  onClick={() => navigate("/your-notifications")}
                  bg="success"
                >
                  {userDetails?.unseenNotifications?.length}
                </Badge>
              </div>
            </Nav.Link>
            {userDetails !== null && userDetails?.isAdmin ? (
                <>
                <Nav.Link className="fw-bold pt-3 fs-5 text-warning">
                    {userDetails?.name}
                  </Nav.Link>

                  <NavDropdown
                    className="text-red-600"
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/admin/listallproducts">
                      <NavDropdown.Item style={{ color: "red" }}>
                        Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/showallusers">
                      <NavDropdown.Item style={{ color: "red" }}>
                        Users
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/ordersList">
                      <NavDropdown.Item style={{ color: "red" }}>
                        Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={() => logoutHandler()}
                      style={{ color: "red" }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : null}

              {userDetails !== null && !userDetails?.isAdmin ? (
                <>
                  <Nav.Link className="fw-bold fs-5 text-warning">
                    {userDetails?.name}
                  </Nav.Link>

                  <NavDropdown className="text-red-600" id="basic-nav-dropdown">
                    <LinkContainer to="/myprofile">
                      <NavDropdown.Item style={{ color: "red" }}>
                        View Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={() => logoutHandler()}
                      style={{ color: "red" }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : null}

              {userDetails=== null ? (
                <NavDropdown
                className="text-red-600"
                  title={"Login"}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/register">
                    <NavDropdown.Item style={{ color: "red" }}>
                      Register
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item style={{ color: "red" }}>
                      Login
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;

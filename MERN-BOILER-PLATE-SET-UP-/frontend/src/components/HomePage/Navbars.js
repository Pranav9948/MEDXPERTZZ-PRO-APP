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

function Navbars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkStyle = {
    textDecoration: "none",
  };

 

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ marginRight: "100px", fontSize: "10px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
           <h2 className="logoText">MedXpertz</h2>
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
              Find Doctors
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
                  count={"2"}
                  onClick={() => navigate("/your-notifications")}
                  className="bg-success"
                >
                  {}
                </Badge>
              </div>
            </Nav.Link>
            <NavDropdown title={"name"} id="basic-nav-dropdown">
              <NavDropdown.Item href="/myprofile">my Profile</NavDropdown.Item>
              <NavDropdown.Item href="/login" onClick={() => dispatch()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            ) : (
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="">Signup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            )
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;

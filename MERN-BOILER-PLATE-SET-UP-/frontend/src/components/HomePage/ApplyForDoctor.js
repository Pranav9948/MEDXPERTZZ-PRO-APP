


import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import applyDoctor1 from "../../ProjectImages/applyDoctor1.jpg";
import applyDoct2   from "../../ProjectImages/applyDoc2.2tor.jpg";
import applyDoct3   from "../../ProjectImages/docApply2.jpg";
import applyDoct4   from "../../ProjectImages/applyDoctor3.jpg";
import Button from "react-bootstrap/Button";
import "../../styles/components/HomePage/UserApplyAsDoctor.css";
import { Link } from "react-router-dom";

function ApplyForDoctor() {
  return (
    <div className="applyAsDoctor color-change-2x">
      <Container>
        <Row>
          <Col md={12} lg={6} xs={12}>
            <Row className="doctorImg">
              <Col md={6} lg={6} xs={6}>
                <img src={applyDoctor1} className="doctorImg1" />
              </Col>

              <Col md={6} lg={6} xs={6}>
                <img src={applyDoct2} className="doctorImg2" />
              </Col>
            </Row>

            <Row className="doctorImg">
              <Col md={6} lg={6} xs={6}>
              <img src={applyDoct3} className="doctorImg3" />
                
              </Col>

              <Col md={6} lg={6} xs={6}>
             
              <img src={applyDoct4} className="doctorImg4" />

                <div className="bckcolo"></div>
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={6}  xs={12} className="descrip">
            <h1>
              &nbsp;&nbsp; Revolutionizing <br></br> Remote Health Care{" "}
              <br></br>
            </h1>

            <h3 className="quality ">
              {" "}
              Quality health care comes only from qualified doctors
            </h3>

            <h3 className="text-focus-in team mt-5">
              {" "}
              &nbsp;&nbsp; JOIN OUR TOP QUALITY  TEAM
            </h3>

            <div className="applyDocBtn">
              <Row>
                <Col md={6}>
                  <Link to={"/applyfordoctoracc"}>
                    <Button variant="warning" size="lg" className="btn1 bg-yellow-400 fw-bold">
                      Apply As Doctor
                    </Button> 
                  </Link>{" "}
                </Col>

                <Col md={5}>
                  <Link to="/viewourdoctors">
                    <Button variant="warning" size="lg" className="btn2 bg-red-400 fw-bold text-white">
                      View our Doctors
                    </Button>
                  </Link>
                </Col>
                <Col md={1}></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ApplyForDoctor;
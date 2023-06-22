import React from "react";
import "../../styles/pages/user/userapplyasdoctor.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cardz from "../../components/applyForDoctor/Cardz"
import Container from "react-bootstrap/esm/Container";
import DoctorForm from "../../components/applyForDoctor/DoctorForm";


function ApplyForDoctorAcc() {

  
  return (
    <>
     
      <Cardz />

      <Container>
        <DoctorForm/> 
      </Container>
      
    </>
  );
}

export default ApplyForDoctorAcc;
import React, { useEffect } from "react";
import BookAppointment from "../components/HomePage/BookAppointment";
import ApplyForDoctor from "../components/HomePage/ApplyForDoctor";
import SearchBanner from "../components/HomePage/SearchBanner";
import Working from "../components/HomePage/Working";
import Mobile7App from "../components/HomePage/Mobile7App";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import Health8Blog from "../components/HomePage/Health8Blog";

const HomePage = () => {
  const { userDetails } = useSelector((state) => state.auth);

  const navigate=useNavigate()
 
    useEffect(() => {
      if (userDetails?.isAdmin) {
        navigate("/admin/showallusers");
      } else if (userDetails?.isDoctor) {
        navigate("/viewDoctorAppointments");
      }

      else{
        navigate("/");
      }


    }, [userDetails, navigate]);
  

  return (
    <div>
      <SearchBanner />
      <BookAppointment />

      <ApplyForDoctor />
      <Working />
     
      <Mobile7App />
      {/* <onecariusel/> */}

      <Health8Blog/>

      
    </div>
  );
};

export default HomePage;

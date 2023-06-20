import React, { useEffect } from "react";
import BookAppointment from "../components/HomePage/BookAppointment";
import ApplyForDoctor from "../components/HomePage/ApplyForDoctor";
import SearchBanner from "../components/HomePage/SearchBanner";
import Working from "../components/HomePage/Working";
import Mobile7App from "../components/HomePage/Mobile7App";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const { userDetails } = useSelector((state) => state.auth);

  const navigate=useNavigate()
 
    useEffect(() => {
      if (userDetails?.isAdmin) {
        navigate("/admin/showallusers");
      } else if (userDetails) {
        navigate("/");
      }
    }, [userDetails, navigate]);
  

  return (
    <div>
      <SearchBanner />
      <BookAppointment />

      <ApplyForDoctor />
      <Working />
      {/* <DoctorCard/> */}
      <Mobile7App />
      {/* <onecariusel/> */}

      {/* some of them are pending finish them before hosting */}
    </div>
  );
};

export default HomePage;

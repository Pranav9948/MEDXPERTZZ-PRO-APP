import React from "react";

const TestiMonialsDetails = ({ testiMonialDetail }) => {
  const { firstName,lastName, clinicLocation, URLS ,experience,specialization} = testiMonialDetail;
  console.log("testiMonialDetail" + testiMonialDetail);
  return (
    <div class="item">
      <div class="shadow-effect">
        <img class="img-circle" src={URLS} />
        <p>Responsible physican with {experience} yrs of experience maximizing patient  wellness </p>
      </div>
      <div class="testimonial-name">
        <h5>{firstName} { ' '} {lastName}</h5>
        <h6>{specialization}</h6>
        <small>{clinicLocation}</small>
      </div>
    </div>
  );
};

export default TestiMonialsDetails;
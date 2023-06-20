
import LayoutAdmin from '../../components/Admin/LayoutAdmin'
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Card,Row, Button } from 'react-bootstrap';
// import { fadeInUp } from 'react-animations';
// import styled, { keyframes } from 'styled-components';
import { useGetApprovedDoctorsQuery } from '../../redux/slices/AdminSlices';

function AdminViewDoctors() {



  const [showDetails, setShowDetails] = useState(false);

  const handleViewMore = () => {
    setShowDetails(!showDetails);
  };
 

    const {data:getAllApprovedDoctors,isLoading,isError}= useGetApprovedDoctorsQuery()
 
  console.log('432',getAllApprovedDoctors)



  return (


    <div>
  
        <LayoutAdmin>

        <Container>
      <Row>
        {

     getAllApprovedDoctors?.map((doctor)=>{
    return (
      <Card key={doctor.lastName} className="m-3 shadow rounded" style={{ maxWidth: "300px", border:'4px solid black' }}>
      <div className="card-img-top">
        <Card.Img variant="top" src={doctor?.image} alt={doctor.firstName} className='p-4' />
      </div>
      <Card.Body>
        <Card.Title className="text-center">
          {showDetails ?  ` DR ${doctor.firstName} ${doctor.lastName}` :  ` DR ${doctor.firstName} ${doctor.lastName}` }
        </Card.Title>
        <Card.Text className="text-center">
              <h6>{doctor.specialization}</h6>
            </Card.Text>
        {showDetails && (
          <>
           
            <hr />
            <Card.Text className="text-center">
              Fee: Rs. {doctor.feePerCunsultation}
            </Card.Text>
            <hr />
            <Card.Text className="text-center">
              Experience: {doctor.experience} years
            </Card.Text>
            <hr />
            <Card.Text className="text-center">
              Timings: {doctor.timings[0]} - {doctor.timings[1]}
            </Card.Text>

            <Card.Text className="text-center">
            
              </Card.Text>
          </>
        )}
        <div className="text-center">
          <Button variant="primary" className="mt-4" onClick={handleViewMore} style={{background:'green'}}>
            {showDetails ? "View Less" : "View More"}
          </Button>

        </div>

      


       
      </Card.Body>
    </Card>

  );

})



   
     
      
   

        
     
}
      </Row>
    </Container>



        </LayoutAdmin>
    




    </div>
   
  )
}
export default AdminViewDoctors
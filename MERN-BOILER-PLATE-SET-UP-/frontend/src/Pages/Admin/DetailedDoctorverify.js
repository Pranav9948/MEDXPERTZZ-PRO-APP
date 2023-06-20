import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/LayoutAdmin";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import  '../../styles/components/Admin/verifyDoctor.css'
import { useApproveDoctorAccountMutation, useGetdoctorApplyAccDetailsQuery, useRejectDoctorAccountMutation } from "../../redux/slices/AdminSlices";
import { toast } from "react-toastify";

function DetailedDoctorverify() {
  let {doctorId} = useParams();
  
  const navigate = useNavigate();


      
      const {data:doctorDetails,isLoading,isError}=  useGetdoctorApplyAccDetailsQuery(doctorId)
       const [approveDoctor,{isLoading:apprload,isError:apprErr}]=useApproveDoctorAccountMutation()
       const [rejectDoctor,{isLoading:rejload,isError:rejErr}]= useRejectDoctorAccountMutation()




  
  const approveDoctorApiRequest = async (docId) => {
    try {
      console.log(2233, docId);

        const {data}  =await approveDoctor(docId) 
     
          if(data.success){

            console.log(data.message);
 
            toast.success(data.message);
            navigate("/admin/notifications");
          }
          else {
            toast.error(data.message);
          }
        } catch (err) {
          toast.error("something went wrong....");
        }
      };
   


   


  const RejectApplyAsDocRequestApi = async (docId) => {
    try {
        console.log(2233, docId);
  
          const {data}  =await rejectDoctor(docId) 
       
          console.log('123')
            if(data.success){
  
              console.log(data.message);
   
              toast.success(data.message);
              navigate("/admin/notifications");
            }
            else {
              toast.error(data.message);
            }
          } catch (err) {
            toast.error("something went wrong....");
          }
  };


  return (
    <Layout>
      <div className="doctorDetailedDetailsPage">
        <h1 className="text-center pt-3 mb-5">Detailed Doctor Page</h1>

        <div className="doctorDetails">
          <Container>
            <Row>
           



 <Col md={4}>
  <figure className="doctor-figure">
    <img
      src={doctorDetails?.image}
      alt="Photo of the doctor"
      className="doctor-img"
      width="300"
      height="300"
    />
    <figcaption className="pt-3 pb-3 text-center">
      A photo of Dr. {doctorDetails?.firstName}
    </figcaption>
  </figure>

  <figure className="doctor-figure">
    <img
      src={doctorDetails?.cimage}
      alt="Certificate of the doctor"
      className="doctor-img"
      width="300"
      height="300"
    />
    <figcaption className="pt-3 pb-3 text-center">
      A photo of Dr. {doctorDetails?.firstName} Certificate
    </figcaption>
  </figure>




</Col> 


              <Col md={1}></Col>


<Col md={6} style={{marginTop:'150px'}}>
  <Accordion defaultActiveKey="0" className="doctor-accordion">
    <Accordion.Item eventKey="0">
      <Accordion.Header className="doctor-accordion-header">
        View Doctor Details
      </Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover className="doctor-details-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
           

          <>
                       

                            <tr>
                              <td>Name</td>
                              <td>
                                {doctorDetails?.firstName} {""}{" "}
                                {doctorDetails?.lastName}
                              </td>
                            </tr>

                            {/* <tr>
                              <td>PhoneNumber</td>
                              <td>{doctorDetails.phoneNumber}</td>
                            </tr> */}

                            <tr>
                              <td>Specialization</td>
                              <td>{doctorDetails?.specialization}</td>
                            </tr>

                            <tr>
                              <td>Experience</td>
                              <td>{doctorDetails?.experience}</td>
                            </tr>

                            <tr>
                              <td>FeePerConsultation</td>
                              <td>{doctorDetails?.feePerCunsultation}</td>
                            </tr>

                            <tr>
                              <td>Timings</td>
                              <td>{doctorDetails?.timings?.[0]} : {doctorDetails?.timings ?.[1]}</td>
                            </tr>

                            <tr>
                              <td>status</td>
                              <td>{doctorDetails?.status}</td>
                            </tr>

                            <tr>
                              <td>Approve Request</td>
                              <td>
                                {
                                  <Button
                                    className="bg-green-400 text-white"
                                    onClick={() =>
                                      approveDoctorApiRequest(doctorDetails._id)
                                    }
                                  >
                                    Approve
                                  </Button>
                                }
                              </td>
                            </tr>

                            <tr>
                              <td>Delete Request</td>
                              <td>
                                {
                                  <Button
                                    className="bg-red-800 text-white"
                                    onClick={() =>
                                      RejectApplyAsDocRequestApi(
                                        doctorDetails._id
                                      )
                                    }
                                  >
                                    Reject
                                  </Button>
                                }
                              </td>
                            </tr>
                          </>




          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
</Col>


              
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

export default DetailedDoctorverify;
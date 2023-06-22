import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "../../styles/components/user/viewourdoctors.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Card, Row, Button } from "react-bootstrap";
import { useGetAllApprovedDoctorsQuery } from "../../redux/slices/userSlice";
import Gif from '../Gif'
import Message from '../Message'

function ViewDoctors({ doctor }) {

  
  const [viewAllDoctors, setViewAllDoctors] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewMore = () => {
    setShowDetails(!showDetails);
  };

  const { data: getApprovedDoctors, isLoading, isError } =
    useGetAllApprovedDoctorsQuery();

  console.log("123", getApprovedDoctors);

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = getApprovedDoctors?.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("7899", filteredDoctors);

  return (

    <>
   

    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (

    <>
      <div className="bannerImagez"></div>

      <div className="bannerz">
        <div className="bannerContentz">
          <h1 className="text-center fw-bold fs-1" style={{ marginBottom: "150px" }}>
            SEE OUR TOP QUALITY DOCTOR TEAM
          </h1>

          <Container>
            <div className="searchForms">
              <input
                type="text"
                placeholder="Search for doctors or specialization"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <i className="fas fa-search"></i>
            </div>

            <Row>
              {filteredDoctors?.length > 0 ? (
                filteredDoctors?.map((doctor) => {
                  return (
                    <Card
                      className="m-3 shadow rounded mx-auto cardContainer"
                      style={{ maxWidth: "300px", border: "4px solid black" }}
                    >
                      <div className="card-img-top">
                        <Card.Img
                          variant="top"
                          src={doctor.image}
                          alt={doctor.firstName}
                          
                          className="p-4 h-60"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="text-center">
                          {showDetails ? (
                            ` DR ${doctor.firstName} ${doctor.lastName}`
                          ) : (
                            ` DR ${doctor.firstName} ${doctor.lastName}`
                          )}
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
                              <Link to={`/bookDoctorAppointment/${doctor._id}`}>
                                <Button variant="primary" className="mt-4">
                                  Book Now
                                </Button>
                              </Link>
                            </Card.Text>
                          </>
                        )}
                        <div className="text-center">
                          <Button
                            variant="primary"
                            className="mt-4"
                            onClick={handleViewMore}
                            style={{ background: "green" }}
                          >
                            {showDetails ? "View Less" : "View More"}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })
              ) : (
                getApprovedDoctors?.map((doctor) => {
                  return (
                    <Card
                      className="m-3 shadow rounded cardContainer"
                      style={{ maxWidth: "300px", border: "4px solid black" }}
                    >
                      <div className="card-img-top">
                        <Card.Img
                          variant="top"
                          src={doctor.URLS}
                          alt={doctor.firstName}
                          className="p-4"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="text-center py-2">
                          {showDetails ? (
                            ` DR ${doctor.firstName} ${doctor.lastName}`
                          ) : (
                            ` DR ${doctor.firstName} ${doctor.lastName}`
                          )}
                        </Card.Title>
                        <Card.Text className="text-center py-2">
                          <h6>{doctor.specialization}</h6>
                        </Card.Text>
                        {showDetails && (
                          <>
                            <hr />
                            <Card.Text className="text-center py-2">
                              Fee: Rs. {doctor.feePerCunsultation}
                            </Card.Text>
                            <hr />
                            <Card.Text className="text-center py-2">
                              Experience: {doctor.experience} years
                            </Card.Text>
                            <hr />
                            <Card.Text className="text-center py-2">
                              Timings: {doctor.timings[0]} - {doctor.timings[1]}
                            </Card.Text>

                            <Card.Text className="text-center py-2" >
                              <Link to={`/bookDoctorAppointment/${doctor._id}`}>
                                <Button className="mt-4 bg-black">
                                  Book Now
                                </Button>
                              </Link>
                            </Card.Text>
                          </>
                        )}
                        <div className="text-center">
                          <Button
                           
                            className="mt-4 bg-blue-600 text-white"
                            onClick={handleViewMore}
                           
                          >
                            {showDetails ? "View Less" : "View More"}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })
              )}
            </Row>
          </Container>
        </div>

        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffff"
            fill-opacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,149.3C672,171,768,245,864,272C960,299,1056,277,1152,229.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
    )}
    </>
  );
};


export default ViewDoctors;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/pages/user/searchDoctor.css";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSearchDoctorsMutation } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import Gif from "../../components/Gif";
import Message from "../../components/Message";

function SearchUsers() {
  const [searchDoctor, setSearchDoctor] = useState({});
  const [searchDoctorz, { isLoading, isError }] = useSearchDoctorsMutation();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const navigate = useNavigate();

  const getSearchResults = async () => {
    try {
      const { data } = await searchDoctorz({ query });

      console.log("dfs", data);

      if (data?.success === false) {
        navigate("/");
        toast.error(data.message);
      } else {
        setSearchDoctor(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <>
      
      {isLoading ? (
        <Gif/>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div>
          <div className="bannerImagess"></div>
          <div className="bannerss text-center">
            <div className="bannerContentss">
              <div class="container">
                <div class="row">

                  <div class="col-md-6 col-sm-12">
                    <div class="doctor-image">

                    <Image 
                      
                        src={searchDoctor?.image}
                        alt="Doctor's image"
                        class="img-fluid"
                        rounded
                      />
                    </div>
                  </div>

                  <div class="col-md-6 col-sm-12">
                    <div class="doctor-details text-center">
                      <h2>
                        Dr. {searchDoctor?.firstName} {searchDoctor?.lastName}
                      </h2>
                      <p>
                        <strong>Specialty:</strong>{" "}
                        {searchDoctor?.specialization}
                      </p>
                      <p>
                        <strong>Years of experience:</strong>{" "}
                        {searchDoctor?.experience} yrs
                      </p>
                      <p>
                        <strong>Phone:</strong> {searchDoctor?.phoneNumber}
                      </p>
                      <p>
                        <strong>Clinic Location:</strong>{" "}
                        {searchDoctor?.clinicLocation}
                      </p>
                      <p>
                        <strong>Consultation Fees:</strong> Rs:{" "}
                        {searchDoctor?.feePerCunsultation}
                      </p>
                      <Link to={`/bookDoctorAppointment/${searchDoctor?._id}`}>
                        <button class="btn btn-warning mt-4">View More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <svg
                  className="waves"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#ffff"
                    fillOpacity="1"
                    d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,149.3C672,171,768,245,864,272C960,299,1056,277,1152,229.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchUsers;

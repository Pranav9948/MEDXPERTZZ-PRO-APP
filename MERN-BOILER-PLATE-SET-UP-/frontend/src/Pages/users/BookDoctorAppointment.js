import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../../styles/pages/user/bookDoctorAppointmentS.css";
import Container from "react-bootstrap/esm/Container";
import StripeCheckout from "react-stripe-checkout";
import { useBookAppointmentMutation, useCheckAvailiabiltyMutation, useGetDoctorByIdQuery, useOnlinebookAppointmentMutation } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import Gif from '../../components/Gif'
import Message from '../../components/Message'

function BookDoctorAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: doctor, isLoading, isError } = useGetDoctorByIdQuery(id);
  const [checkAvailable,{isLoading:checkLoad,isError:checkErr}]=useCheckAvailiabiltyMutation()
  const [bookAppointmentz,{isLoading:bookLoad,isError:bookErr}]= useBookAppointmentMutation()
  const [bookOnlineAppointmentz,{isLoading:bookonlineLoad,isError:bookonlineErr}]=  useOnlinebookAppointmentMutation()


 const {userDetails}= useSelector((state)=>state.auth)

  console.log("123doc", doctor);

  const startHours = doctor?.timings[0].split(":");

  const endHours = doctor?.timings[1].split(":");

  const startHour = startHours && parseInt(startHours[0].trim());
  const endHour = endHours && parseInt(endHours[0].trim()) + 1;

  console.log("then", startHour);

  const checkAvailability = async () => {
    try {
 
        const {data}=  await checkAvailable({date,time,id})

        
      
     
      if (data.success) {
        toast.success(data.message);
        setIsAvailable(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      
    }
  };


 


  const bookNow = async () => {
    setIsAvailable(false);
    try {
  
        const {data}=   await  bookAppointmentz({ doctorId: id,
              userId: userDetails._id,
              doctorInfo: doctor,
              userInfo: userDetails,
              date: date,
              time: time

            })

            console.log('oll',data)

      if (data.success) {
        toast.success(data.message);
        navigate("/view-appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      
    }
  };

  function validateTime(currentTime) {
    const availableTimes = ["10:00", "11:00", "12:00", "13:00", "14:00"];
    const currentHour = currentTime.getHours();
    const filteredTimes = availableTimes.filter((time) => {
      const availableHour = parseInt(time.split(":")[0], 10);
      return availableHour >= currentHour;
    });
    return filteredTimes.map((time) => {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    });
  }

  function disabledDate(current) {
    // can't select days before today
    return current && current < new Date(Date.now() - 86400000); // 86400000 is the number of milliseconds in a day
  }

  const onlinebookNow = async (token) => {
    console.log("444shefeeq", token);

    

      setIsAvailable(false);
      try {
    
          const {data}=   await  bookOnlineAppointmentz({ token,
            doctorId: id,
            userId: userDetails._id,
            doctorInfo: doctor,
            userInfo: userDetails,
            date: date,
            time: time,
  
              })
  
              console.log('okkk',data)
  
        if (data.success) {
          toast.success(data.message);
          navigate("/view-appointments");
        }
      } catch (error) {
        toast.error("Error booking appointment");
        
      }
      
      

    
     
  };

  return (

    <>
    {checkLoad && <Gif />}
    {bookLoad && <Gif />}
    {bookonlineLoad && <Gif />}
    

    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (

      <>
      <div className="bannerImagezz"></div>
      <div className="bannerzz">
        <div className="bannerContentz">
          <h1
            className="text-center fw-bold fs-1 text-yellow-400 "
            style={{
              marginTop: "100px",
              marginBottom: "100px",
              color: "white",
            }}
          >
            Book Appointment Now
          </h1>
          <Container>
            <div>
              <hr  />
              <Row gutter={50}  align="middle" >

              <Col lg={2}></Col>

                <Col span={8} sm={24} xs={24} lg={8}>
                  <img
                    src={doctor?.image}
                    
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                      marginTop:'-250px'
                      
                    }}
                  ></img>

<Col lg={3}></Col>

                  <h1 className="page-title drName text-white mt-4 text-center">
                    Dr: {doctor?.firstName} {doctor?.lastName}
                  </h1>
                </Col>

              

                <Col span={8} sm={24} xs={24} lg={10}>
                  <div className="doctor-info p-4 rounded-lg shadow-md font-sans border">
                    <h1 className=" font-bold mb-6 pb-10">
                      <span className="text-green-400 fs-1">Timings : {doctor?.timings[0]} -{" "}
                      {doctor?.timings[1]}</span>
                    </h1>
                    <p className="text-gray-700">
                      <b className="text-blue-400">Phone Number :</b> {doctor?.phoneNumber}
                    </p>
                    <p className="text-gray-700">
                      <b className="text-blue-400">Clinic Name :</b> {doctor?.clinicName}
                    </p>
                    <p className="text-gray-700">
                      <b className="text-blue-400">Clinic Location :</b> {doctor?.clinicLocation}
                    </p>
                    <p className="text-gray-700">
                      <b className="text-blue-400">Fee per Visit :</b> {doctor?.feePerCunsultation}
                    </p>
                    <p className="text-gray-700">
                      <b className="text-blue-400">Website :</b> {doctor?.website}
                    </p>
                  </div>

                  <div className="d-flex flex-column pt-2 mt-2">
                  <label className="text-white mb-4 mt-4 fw-bold fs-4">Select Date</label>

                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={disabledDate}
                      onChange={(value) => {
                        const date = new Date(value);
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = date.getFullYear().toString();
                        setDate(`${day}-${month}-${year}`);
                        setIsAvailable(false);
                      }}
                    />

                   

                    {console.log("okk", startHour)}

                    <label className="text-white mb-4 mt-4 fw-bold fs-4">Select Timeslot</label>

                    <TimePicker
                      format="HH:mm"
                      className="mt-3"
                      onChange={(value) => {
                        console.log("333", value.format("HH:mm"));
                        setIsAvailable(false);
                        setTime(value.format("HH:mm"));
                      }}
                      disabledHours={() => {
                        const hours = [];
                        for (let i = 0; i < startHour; i++) {
                          hours.push(i);
                        }
                        for (let i = endHour; i < 24; i++) {
                          hours.push(i);
                        }
                        return hours;
                      }}
                      disabledMinutes={(selectedHour) => {
                        const minutes = [];
                        if (selectedHour === 9) {
                          for (let i = 0; i < 60; i++) {
                            if (i < 0 || i > 30) {
                              minutes.push(i);
                            }
                          }
                        } else if (selectedHour === 17) {
                          for (let i = 0; i < 60; i++) {
                            if (i > 0 && i < 30) {
                              minutes.push(i);
                            }
                          }
                        } else {
                          for (let i = 0; i < 60; i++) {
                            minutes.push(i);
                          }
                        }
                        return minutes;
                      }}
                    />

                    {!isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={checkAvailability}
                        style={{height:'50px'}}
                      >
                        Check Availability
                      </Button>
                    )}

                    {isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button pb-3"
                        onClick={bookNow}
                        style={{height:'50px'}}
                      >
                        Book Now and Pay on visit
                      </Button>
                    )} 
                  
                    {isAvailable && (
                      <Button className="primary-button mt-3 full-width-button"   style={{height:'50px'}}>
                        <StripeCheckout
                          shippingAddress
                          token={onlinebookNow}
                          amount={doctor?.feePerCunsultation * 100}
                          stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
                        >
                         Pay Now
                        </StripeCheckout>
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div></div>

        <div>
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
      </div>
      </>
      )}
    </>
  );
};


export default BookDoctorAppointment;

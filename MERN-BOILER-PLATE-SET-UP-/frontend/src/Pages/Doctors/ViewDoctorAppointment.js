import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  Table } from "antd";
import moment from "moment";
import DoctorsLayout from '../../components/Doctors/DoctorsLayout'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useChangeAppointmentStatusMutation, useGetDoctorAppointmentsQuery } from "../../redux/slices/DoctorSlices";
import { toast } from "react-toastify";
import Gif from "../../components/Gif";
import Message from "../../components/Message";

function ViewDoctorAppointment() {


  const dispatch = useDispatch();

    const {data:appointments,isLoading,isError,refetch}= useGetDoctorAppointmentsQuery()
    const [ChangeAppointmentStatuz,{isLoading:statusLoad,isError:statusErr}]=useChangeAppointmentStatusMutation()

   

  const changeAppointmentStatus = async (record, status) => {
    try {


      const response =  await ChangeAppointmentStatuz({ appointmentId : record._id, status: status })
      
      
    
      if (response.data.success) {
        toast.success(response.data.message);
        refetch()
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      
    }
  };
 
 
 
  const columns = [
    

    {
      title: "SL",
      dataIndex: "_id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },

    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },

    ,
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (text, record) => (

     

         <span>
        {record.paymentStatus === 'done' ? (
          <span style={{ display: 'inline-block' }}>
            <FontAwesomeIcon icon={faCheck} style={{color:'green',marginLeft:'28px'}} className='fs-2' />
          </span>
        ):  <span style={{ display: 'inline-block' }}>
        <FontAwesomeIcon icon={ faTimes } style={{color:'red',marginLeft:'28px'}} className='fs-2' />
      </span>}
        </span>
 


      ),
    },






    {
      title: "Appointment Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">

              <Button  style={{background:'green'}} className="me-4 text-white"
                    onClick={() => changeAppointmentStatus(record, "approved")}> Approve</Button>

                   

               <Button type="primary" variant="danger"  className=""
                       onClick={() => changeAppointmentStatus(record, "rejected")}> Reject</Button>

            
           
            </div>
          )}
        </div>
      ),
    },
  ];
 

  return (

    <div>
   <DoctorsLayout>




   <>
   { statusLoad && <Gif />}
  
   

   {isLoading ? (
     <Gif />
   ) : isError ? (
     <Message variant="danger">
       {isError?.data.message || isError.error}
     </Message>
   ) : (





 <>



    



      <h1 className="page-header text-center mt-4 mb-4 fs-3"> VIEW ALL APPOINTMENTS</h1>
      <hr />
      


  <Table id="mytable" columns={columns} dataSource={appointments}  style={{ backgroundColor: "white" }} />

   
    </>

    
    
)}

</>
</DoctorsLayout>
</div>
);
};

export default ViewDoctorAppointment;
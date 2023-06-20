import { Tabs } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Admin/LayoutAdmin";

import Button from "react-bootstrap/esm/Button";
import  { LinkContainer } from "react-router-bootstrap";
import '../../styles/pages/admin/userNotifications.css'
import { useClearAllMutation, useGetUserProfileQuery, useMarkAsSeenMutation } from "../../redux/slices/AdminSlices";
import { toast } from "react-toastify";


function Notifications() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {data:getuserDetails,isLoading,isError,refetch}=useGetUserProfileQuery()
   
   const [markAllSeen,{isLoading:seenLoading,isError:seenErr}]=useMarkAsSeenMutation()

   const [clearAllSeen,{isLoading:clearLoading,isError:clearErr}]=useClearAllMutation()

  


  const markAllAsSeen = async () => {
    try {
     
      const response = await markAllSeen()

      console.log(response,"rs")
   
      if (response.data.success) {
        toast.success(response.data.message);
        refetch()
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
       toast.error("Something went wrong");
       console.log(error)
    }
  };


  const deleteAll=async () => {
    try {
     
      const response = await clearAllSeen()

      console.log(response,"rs")
   
      if (response.data.success) {
        toast.success(response.data.message);
        refetch()
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
       toast.error("Something went wrong");
       console.log(error)
    }
  };




  
  return (
    <Layout>
      <h1 className="page-title pb-3">Notifications</h1>
      <hr />

      <Tabs className="mt-4">
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <Button
              
              size="lg"
              className="me-4 mb-4 fs-4 fw-bold bg-orange-500"
              style={{ height: "70px" }}
              onClick={() => markAllAsSeen()}
            >
              Mark All As Seen
            </Button>
          </div>

          {getuserDetails?.unseenNotifications?.map((notification) => (
             
           

            <div
              className="card p-2 mb-5 p-4"
              onClick={() => navigate(`/detailedDoctorsVerifyPage/${notification.data.doctorId}`)}
            >
             
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <Button
             
              size="lg"
              className="me-4 mb-4 fs-4 fw-bold bg-red-600 text-white"
              style={{ height: "70px" }}
              onClick={() => deleteAll()}
            >
              Delete All
            </Button>{" "}
          </div>
          {getuserDetails?.seenNotifications?.map((notification) => (
            <div
              className="card p-2 mt-2"
              onClick={() => navigate(notification.onClickPath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications
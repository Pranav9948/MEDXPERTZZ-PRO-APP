import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { LinkContainer } from "react-router-bootstrap";
import "../../styles/pages/user/userNotifications.css";
import {
  useClearAllMutation,
  useMarkAsSeenMutation,
} from "../../redux/slices/AdminSlices";
import { useGetUserProfileQuery } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import Gif from "../../components/Gif";
import Message from "../../components/Message";

function UserNotifications() {
  const {
    data: getuserDetails,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery();

  const [markAllSeen, { isLoading: seenLoading, isError: seenErr }] =
    useMarkAsSeenMutation();

  const [clearAllSeen, { isLoading: clearLoading, isError: clearErr }] =
    useClearAllMutation();

  const navigate = useNavigate();

  const markAllAsSeen = async () => {
    try {
      const response = await markAllSeen();

      console.log(response, "rs");

      if (response.data.success) {
        toast.success(response.data.message);
        refetch();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteAll = async () => {
    try {
      const response = await clearAllSeen();

      console.log(response, "rs");

      if (response.data.success) {
        toast.success(response.data.message);
        refetch();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };



  return (
    <>



{seenLoading &&  <Gif />}
{seenErr &&  <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>}



{clearLoading &&  <Gif />}
{clearErr &&  <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>}


    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (

         


<div className="pt-20">
      <div className="bannerImagem"></div>
      <div className="bannerm">
        <div className="bannerContentm">
          <h1 className="text-center fw-bold fs-1 text-white">
            See All Your Notifications
          </h1>



          <Container>
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
                    onClick={() =>
                      navigate(
                        `/detailedDoctorsVerifyPage/${notification.data.doctorId}`
                      )
                    }
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
    </div>
    )}
    </>
  )
}

export default UserNotifications;

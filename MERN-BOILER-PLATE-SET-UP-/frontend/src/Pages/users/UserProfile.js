import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError, useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useUploadImageMutation,
  useUserUpdateprofileMutation,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import Gif from "../../components/Gif";
import Message from "../../components/Message";

function UserProfile() {
  const [userDetails, setUserDetails] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [mobile, setMobile] = useState();
  const [picMessage, setPicMessage] = useState();
  const [image, setImage] = useState("/image/profile");
  const [ProfileImage, setProfileImage] = useState([]);
  const [displayData, setDisplayData] = useState(false);

  const { data: profile, isLoading, isError } = useGetUserProfileQuery();
  const [uploadImage, { isLoading: uploadLoad, isError: uploadErr }] =
    useUploadImageMutation();
  const [updateProfile, { isLoading: updateLoad, isError: updateErr }] =
    useUserUpdateprofileMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setProfileImage(image);

      console.log("34555", name, email, ProfileImage);

      const { data } = await updateProfile({ name, email, ProfileImage });

      if (data.success === true) {
        toast.success("user profile updated successfully");
      } else {
        toast.errror("cannot update profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const imageUploadHanler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setProfileImage(res.image)
    } catch (err) {
      console.log(err);
      toast.error(err?.data.message || err.error);
    }
  };

  return (

    <>
    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (
    <div>
      <Container>
        <Row>
          <h1 className="text-center mt-5 text-primary">Edit your Profile</h1>
        </Row>

        {updateLoad && <Gif/>}

        <Row className="profileContainer" style={{ marginTop: "100px" }}>
          <Col md={6}>
           

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={profile?.name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  defaultValue={profile?.email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput39"
              >
                <Form.Label className="text-black ">
                  profile Picture{" "}
                </Form.Label>

                <Form.Control type="file" onChange={imageUploadHanler} />
              </Form.Group>

              <Button type="submit" className="bg-blue-600 text-white">
                Update
              </Button>
            </Form>
          </Col>

          <Col
            md={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              className="img-fluid"
              src={image ? image : profile?.image}
              alt=""
              style={{ width: "300px", height: "300px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
    )}
    </>
  );
  
          
   };

export default UserProfile;

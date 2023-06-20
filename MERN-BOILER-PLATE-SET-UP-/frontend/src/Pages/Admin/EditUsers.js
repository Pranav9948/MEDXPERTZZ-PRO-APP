import React, { useEffect, useState } from "react";
import Layout from "../../components/Admin/LayoutAdmin";
import  "../../styles/pages/admin/editusers.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";


import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from "../../redux/slices/AdminSlices";
import { toast } from "react-toastify";

function EditUsers() {
  const dispatch = useDispatch();
  let { userId } = useParams();
  const navigate = useNavigate();


  const {data:userDetails,isLoading,isError}=useGetUserByIdQuery(userId)
  const [updateUserById,{isLoading:updateLoad,isError:updateErr}]= useUpdateUserByIdMutation()



  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [isDoctor, setIsDoctor] = useState();


  const handleSubmit=async(e)=>{

    e.preventDefault()

     try{

      const {data} =await updateUserById({name,email,isAdmin,isDoctor,userId})

      if(data.success){

        toast.success(data.message)

        navigate('/admin/showallusers')
      }

      else{

        toast.error( data.message || 'failed to update')
      }

    }

    catch(err){

      console.log(err)
      toast(err?.data?.message || err.error);
    }
         

  }




  return (
    <Layout>
      <div className="editUsers">
        <h1>Edit Users</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3 editForm mt-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              defaultValue={userDetails?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 mt-3  editForm"
            controlId="exampleForm.ControlInput1"
            
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              defaultValue={userDetails?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-5 checked" controlId="2">
            <Form.Check
              type={"checkbox"}
              id={`default-${"checkbox"}`}
              label={` Is Admin`}
              defaultChecked={userDetails?.isAdmin ?'checked' :'' }
              
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3 checked" controlId="1">
            <Form.Check
              type={"checkbox"}
              id={`default-${"checkbox"}`}
              label={` Is Doctor`}
              defaultChecked={userDetails?.isDoctor ?'checked' :'' }
              
      
              onChange={(e) => setIsDoctor(e.target.checked)}
            />
          </Form.Group>
          <Button className="btnzz bg-yellow-400 w-0.5" type="submit">
            EDIT
          </Button>{" "}
        </Form>
      </div>
    </Layout>
  );
}

export default EditUsers;
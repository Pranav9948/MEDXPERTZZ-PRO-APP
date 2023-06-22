import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { deleteNoteAction } from "../../../Redux/actions/DoctorActions";
import DoctorsLayout from "../../components/Doctors/DoctorsLayout";
import { useDispatch } from "react-redux";
import {
  useDeleteNoteMutation,
  useGetDoctorBlogzQuery,
} from "../../redux/slices/DoctorSlices";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Gif from "../../components/Gif";
import Message from "../../components/Message";

function ListBlogs() {
  const dispatch = useDispatch();

  const {
    data: doctorsblog,
    isLoading,
    isError,
    refetch,
  } = useGetDoctorBlogzQuery();

  const [deleteNote, { isLoading: deleteLoad, isError: deleteErr }] =
    useDeleteNoteMutation();

  const handleDelete = async (blogid) => {
    try {
      if (window.confirm("Are you sure?")) {
        const { data } = await deleteNote(blogid);

        if (data.success) {
          toast.success(data.message);
          refetch()
        } else {
          toast.error("cannot delete note");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };

  return (

    <div>
    <DoctorsLayout>
 
 
 
 
    <>
    { deleteLoad && <Gif />}
   
    
 
    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (
 
 
 
 
 
  <>
    <div>
     
        <div className="container">
          <h1 className="text-center my-4"> Your Health Blogs</h1>

           <Link to='/createhealthblogs'> <Button className="bg-orange-500 ms-auto">createhealthblogs</Button> </Link>

          <div className="row">
            {doctorsblog?.map((blog) => (
              <div className="col-md-6 my-3 text-center" key={blog._id}>
                <div
                  className="blog"
                  style={{
                    height: "600px",
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="img-fluid"
                    style={{ height: "60%", width: "100%", objectFit: "cover" }}
                  />
                  <div className="p-3">
                    <h2 style={{ fontSize: "1.5rem" }}>{blog.title}</h2>

                    {/* <Link to={`/detailedblog/${blog._id}`} className="btn btn-primary mt-5">
                Read More
              </Link> */}

                    <div className="button-container">
                      <Link
                        to={`/editblog/${blog._id}`}
                        className="btn btn-warning mr-2 mt-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-danger ms-4 mt-3"
                      >
                        Delete
                      </button>
                    </div>
                    <Link
                      to={`/detailedblog/${blog._id}`}
                      className="btn btn-primary mt-3"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center my-4">
            <Link to="/" className="btn btn-outline-primary mt-3">
              <i className="bi bi-arrow-left"></i> Back to Home
            </Link>
          </div>
        </div>
      
    </div>
    </>

    
    
)}

</>
</DoctorsLayout>
</div>
);
};

export default ListBlogs;

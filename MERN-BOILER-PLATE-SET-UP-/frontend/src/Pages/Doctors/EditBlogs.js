import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DoctorsLayout from "../../components/Doctors/DoctorsLayout";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  useGetDetailedBlogQuery,
  useUpdateNotesMutation,
} from "../../redux/slices/DoctorSlices";
import { toast } from "react-toastify";
import { useUploadImageMutation } from "../../redux/slices/userSlice";

function EditBlogs() {
  const { blogId } = useParams();

  const [pic, setPic] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // const { blogId } = useParams();
  // const [singleBlog,setSingleBlog]=useState()
  // const [value,setValue]=useState(false)

  const {
    data: blogDetails,
    isLoading,
    isError,
  } = useGetDetailedBlogQuery(blogId);
  const [updateNote, { isLoading: updateLoad, isError: updateErr }] =
    useUpdateNotesMutation();

    const [uploadImage,{isLoading:uploadLoad,isError:uploadErr}]= useUploadImageMutation()

   

  const dispatch = useDispatch();



  const handleSubmit = async (e) => {


    console.log('updated button')

    e.preventDefault();
    console.log( 
      `Blog Title: ${title}\nBlog Content: ${content}\nImage File: ${pic}`
    );

    

    try {
      const { data } = await updateNote({title, content, image,blogId});

      if (data.success) {
        toast.success(data.message);
        Navigate("/yourblogs");
      } else {
        toast.error("cannot edit note");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }

    resetHandler();
  };

  const resetHandler = () => {
    setTitle("");
    setPic("");
    setContent("");
    setImage("");
  };



  const imageUploadHanler=async(e)=>{

    const formData=new FormData()
  
  
  
       formData.append('image',e.target.files[0])
  
       try{
  
  
              const res=  await uploadImage(formData).unwrap()
              toast.success(res.message)
              setImage(res.image)
  
       }
  
       catch(err){
  
        console.log(err)
        toast.error(err?.data.message||err.error)
  
       }
      }
  return (
    <DoctorsLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="text-center mb-4">Edit Blog Post</h1>

            {blogDetails && blogDetails[0] && (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="blogTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog title"
                    defaultValue={blogDetails[0] && blogDetails[0]?.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="blogContent">
                  <Form.Label>Content</Form.Label>
                  <ReactQuill
                    defaultValue={blogDetails[0] && blogDetails[0]?.content}
                    onChange={setContent}
                    placeholder="Enter blog content"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput39">
              <Form.Label className="text-black ">Upload Image</Form.Label>
              <Form.Control
                type="text"
                defaultValue={image}
                onChange={(e) => setImage(e.target.value)}
              />


               <Form.Control
                type="file"
                onChange={imageUploadHanler}
              />
            </Form.Group>






                <Button type="submit"  style={{background:'green'}} >
                  Update Note
                </Button>

                <Button
                  className="mx-2"
                  style={{background:'red'}}
                  onClick={resetHandler}
                >
                  Reset Feilds
                </Button>
              </Form>
            )}
          </div>

          <div className="col-md-4" style={{ marginTop: "100px" }}>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                className="img-fluid"
                src={  image ? image :     blogDetails && blogDetails[0]?.image}
                alt=""
                style={{ width: "300px", height: "300px" }}
              />
            </Col>
          </div>
        </div>
      </div>
    </DoctorsLayout>
  );
}


export default EditBlogs;

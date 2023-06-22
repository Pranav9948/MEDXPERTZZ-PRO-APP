import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DoctorsLayout from '../../components/Doctors/DoctorsLayout';
import { useDispatch } from 'react-redux';
import { useUploadImageMutation } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useCreateNotesMutation } from '../../redux/slices/DoctorSlices';


function DoctorBlogz() {


   
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('/uploads\image-1687344903927.jpg');
  
 const dispatch=useDispatch()
 const [uploadImage,{isLoading:uploadLoad,isError:uploadErr}]= useUploadImageMutation()
 const [createNote,{isLoading,isError}]=useCreateNotesMutation()

 

const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(`Blog Title: ${title}\nBlog Content: ${content}\nImage File: ${image}`);
  
  try{

 
  if (!title || !content || !image) return;

  const response = await createNote({title,content,image})

  console.log('1222',response.data)
  
  if (response.data.success) {
    toast.success(response.data.message);
    resetHandler();
  Navigate("/mynotes");
    
  } else {
    toast.error(response.data.message);
  }
} 
  

  catch (error) {
  
    console.log("2111",error)
    
  }

 
};


const resetHandler = () => {
  setTitle("");
 
  setContent("");
  setImage('')
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
          <h1 className="text-center mb-4">Create a New Blog Post</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>


            <Form.Group controlId="blogContent">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Enter blog content"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput39">
              <Form.Label className="text-black ">Upload Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />


               <Form.Control
                type="file"
                onChange={imageUploadHanler}
              />
            </Form.Group>









            <Button type="submit" style={{background:'green'}}>
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} style={{background:'red'}}>
              Reset Fields
            </Button>
          </Form>
        </div>


        <div className='col-md-4'style={{marginTop:'100px'}} >
         <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

          
          { image &&  <img className="img-fluid" src={image} alt="" style={{width:'300px',height:'300px'}}/>  }
          </Col>
        </div>
      </div>
    </div>

    </DoctorsLayout>

   
  )
}

export default DoctorBlogz
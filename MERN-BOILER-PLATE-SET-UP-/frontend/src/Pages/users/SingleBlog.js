 


import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailedBlogQuery } from '../../redux/slices/userSlice';
import Gif from "../../components/Gif";
import Message from "../../components/Message";


function SingleBlog(props) {

    const { blogid } = useParams();
     const {data:singleBlog,isLoading,isError}=useGetDetailedBlogQuery(blogid)

   console.log('bnmm',singleBlog)

 



  

   
   return (
    <>
      {isLoading ? (
        <Gif />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <Container className="pt-32">
          {singleBlog && singleBlog[0] ? (
            <>
              <div className="text-center mb-4">
                <h1 className="display-4 mb-2">{singleBlog[0]?.title}</h1>
                <img
                  src={singleBlog[0]?.image}
                  alt={singleBlog[0]?.title}
                  className="img-fluid rounded shadow-lg"
                />
              </div>
              <div className="text-justify">
                <p
                  className="lead"
                  dangerouslySetInnerHTML={{ __html: singleBlog[0]?.content }}
                ></p>
              </div>
              <div className="d-flex justify-content-between align-items-center my-4">
                <span className="text-muted">Posted on March 30, 2022</span>
                <Link to="/getallblogs" className="btn btn-outline-primary mt-3">
                  <i className="bi bi-arrow-left"></i> Back to All Articles
                </Link>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      )}
    </>
  );
  
          
   };
  

export default SingleBlog;
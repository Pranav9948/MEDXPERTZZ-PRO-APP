import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetBlogzUserQuery } from '../../redux/slices/userSlice';


function Health8Blog() {

  const {data:healthBlogs,isLoading,isError}= useGetBlogzUserQuery()


console.log('34kkk',healthBlogs)


  return (


    <div style={{marginTop:'200px'}}>

      <h1 className='text-center mb-5 fw-bold fs-2' style={{paddingBottom:'100px'}}>Read Health Blogs From Top Expertz</h1>

        <Carousel>
      <Carousel.Item>
        <Container>
        <Carousel>
      <Carousel.Item>
       <Container>
      <Row className="justify-content-center justify-content-md-between">
        {healthBlogs?.slice(0, 3)?.map((blog) => (
          <Col key={blog.id} xs={10} md={4}>
            <Card className="blog-card text-center">
              <Card.Img variant="top" src={blog?.image} style={{ height: '200px', width: '300px' }} />
              <Card.Body>
                <Card.Title>{blog?.title}</Card.Title>
                <Link to={`/detailedblog/${blog?._id}`}>
                  <Button className='mt-4 bg-yellow-400 text-black fw-bold'>Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </Carousel.Item>
  <Carousel.Item>
    <Container>
      <Row className="justify-content-center justify-content-md-between">
        {healthBlogs?.slice(3, 6)?.map((blog) => (
          <Col key={blog.id} xs={10} md={4}>
            <Card className="blog-card text-center">
              <Card.Img variant="top" src={blog?.image} style={{ height: '200px', width: '300px' }} />
              <Card.Body>
                <Card.Title>{blog?.title}</Card.Title>
                <Link to={`/detailedblog/${blog?._id}`}>
                  <Button className='mt-4 bg-yellow-400 text-black fw-bold' >Read More</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </Carousel.Item>
</Carousel>

        </Container>
      </Carousel.Item>
    </Carousel>

    <div className="text-center">
     
    
    <Link to={'/getallblogs'}>  <Button variant="primary" className='btn-lg bg-blue-800 text-white' style={{margin:'100px auto'}}>Read More Health Blogs</Button> </Link>
    </div>
    </div>
  )
}

export default Health8Blog






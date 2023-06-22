
import '../../styles/components/HomePage/SearchSection.css'
import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


 



function SearchBanner() {


  const [search, setSearch] = useState('');
 
  console.log("okk",search)

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search-results?query=${encodeURIComponent(search)}`);
  }


  return (

<div className='myComponent'>
  <div className='searchText'>
    <h1 className='text-center text-white fw-bold fs-1 pb-2'>Your Home For Health</h1>
    <h3 className='text-center text-white fw-bold fs-3 pt-2 pb-5'>Find and Book</h3>
  </div>
  <div className='searchForm'>
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center" style={{ marginTop: '-80px' }}>
        <Col xl={8} lg={6} className="mt-3">
          <FormControl type="text" placeholder="Search for Doctors..." className="form-control-lg" onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col xl={4} lg={6}>
          <Button type="submit" className="btn-lg">Search</Button>
        </Col>
      </Row>
    </Form>
  </div>
</div>





  )
}

export default SearchBanner

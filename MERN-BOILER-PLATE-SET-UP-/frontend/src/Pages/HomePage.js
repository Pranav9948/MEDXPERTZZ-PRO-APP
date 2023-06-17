import React from 'react'
import BookAppointment from '../components/HomePage/BookAppointment'
import ApplyForDoctor from '../components/HomePage/ApplyForDoctor'
import SearchBanner from '../components/HomePage/SearchBanner'
import Working from '../components/HomePage/Working'
import Mobile7App from '../components/HomePage/Mobile7App'


const HomePage = () => {

  return (

    <div>
    
       <SearchBanner/>
       <BookAppointment/>
        <ApplyForDoctor/> 
       <Working/> 
       {/* <DoctorCard/> */}
       <Mobile7App/>
       {/* <onecariusel/> */}

       {/* some of them are pending finish them before hosting */}
      
    </div>
  )
}

export default HomePage

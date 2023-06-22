import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const DoctorsRoutes = () => {

     const { userDetails} = useSelector((state)=>state.auth)
   

     

  return (
    <div>

    {
        userDetails?.isDoctor ? <Outlet/> : <Navigate to={'/login'}/>
    }
      
    </div>
  )
}

export default DoctorsRoutes
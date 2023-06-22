import React, { useState } from "react";
import  "../../styles/components/Doctors/doctorLayout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Badge } from "antd";
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoz from "../../ProjectImages//Medxpertd.png";
import { useLogoutMutation } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { removeCredentials } from "../../redux/slices/authSlice";



function  DoctorsLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {userDetails} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


 


  const  [logout,{isLoading,isError}]  =    useLogoutMutation()
 
  const logoutHandler=async()=>{

    console.log('logouytttt')
    
   const res= await logout().unwrap()

   console.log('123',res)

   if(res.success){
 console.log('loggging out')
      toast.success(res.message)
      dispatch(removeCredentials())
      navigate('/login')
   }



  }

  

  const navigate = useNavigate();
  const location = useLocation();
  

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/viewDoctorAppointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile`,
      icon: "ri-user-line",
    },

    {
      name: "Blogs",
      path: "/yourblogs",
      icon: "ri-book-mark-line",
     
    },

   
  ];

  

  const menuToBeRendered = doctorMenu
    
  const role = "Doctor"
   
  return (
    <div className="mainD" style={{marginTop:'100px'}}>
      <div className="d-flex layout">
        <div className="sidebarD">
          <div className="sidebar-headerD text-center">
    

            
            <img src={logoz} alt="MedXperts Logo" />
            
        

           
          </div>

          <div className="menu" style={{marginTop:'-70px'}}>
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}


            <div className={`d-flex menu-item`}>
  <i className="ri-logout-circle-line" onClick={logoutHandler}></i>
  {!collapsed && <button className="bg-slate-600 p-1" onClick={logoutHandler}>Logout</button>}
</div>



          </div>
        </div>

        <div className="contentD">
          <div className="headerD">

         
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

<h1 className="role me-auto ms-5" style={{marginTop:"-15px"}}> <FontAwesomeIcon icon={faUserMd} size="2x" className=" text-white text-center" /> {role}</h1>

            <div className="d-flex align-items-center px-4">
              <Badge
                count={userDetails?.unseenNotifications?.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2 ms-4" to="/profile" style={{ textDecoration: 'none' }}>
                {userDetails?.name}
              </Link>
            </div>
          </div>

          <div className="bodyD">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default  DoctorsLayout;

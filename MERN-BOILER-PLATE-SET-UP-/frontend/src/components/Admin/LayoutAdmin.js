import React, { useState } from "react";
import "../../styles/components/Admin/layoutAdmin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import logoz from "../../ProjectImages/MedXpertsLogo.png";
import { toast } from "react-toastify";
import { removeCredentials } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/slices/userSlice";

function LayoutAdmin(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { userDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [logout, { isLoading, isError }] = useLogoutMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/showallusers",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/viewourdoctors",
      icon: "ri-user-star-line",
    },
  ];

  const menuToBeRendered = userDetails?.isAdmin && adminMenu;

  const role = userDetails?.isAdmin && "Admin";

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


  return (
    <div className="main w-fit" style={{marginTop:'100px'}}>
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={logoz} alt="MedXperts Logo" />
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered?.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={menu.name}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div className={`d-flex menu-item`}>
              <i className="ri-logout-circle-line" onClick={logoutHandler}></i>
              {!collapsed && (
                <button className="bg-orange-400 p-1" onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="content ">
          <div className="header w-[990px]">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon text-blue-600"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon text-blue-600"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={userDetails?.unseenNotifications?.length}
                onClick={() => navigate("/admin/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2 ms-5" to="/profile">
                {userDetails?.name}
              </Link>
            </div>
          </div>

          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;

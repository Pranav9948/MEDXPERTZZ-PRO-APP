import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const { userDetails } = useSelector((state) => state.auth);

  return (
    <div>{userDetails?.isAdmin ? <Outlet /> : <Navigate to={"/login"} />}</div>
  );
};

export default AdminRoutes;
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./input.css";

import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ApplyForDoctorAcc from "./Pages/users/ApplyForDoctorAcc";
import SuccessApplyDoctor from "./components/applyForDoctor/SuccessApplyDoctor";
import AdminRoutes from "./Pages/Admin/AdminRoutes";
import ShowAllUsers from "./Pages/Admin/ShowAllUsers";
import EditUsers from "./Pages/Admin/EditUsers";
import Notifications from "./Pages/Admin/Notifications";
import DetailedDoctorverify from "./Pages/Admin/DetailedDoctorverify";
import AdminViewDoctors from "./Pages/Admin/AdminViewDoctors";
import ViewOurDoctors from "./Pages/users/ViewOurDoctors";
import BookDoctorAppointment from "./Pages/users/BookDoctorAppointment";
import PrivateRoutes from "./components/PrivateRoutes";
import ViewAppointments from "./Pages/users/ViewAppointments";
import SearchUsers from "./Pages/users/SearchUsers";
import DoctorsRoutes from "./components/Doctors/DoctorsRoutes";
import DoctorsHomePage from "./Pages/Doctors/DoctorsHomePage";
import ViewDoctorAppointment from "./Pages/Doctors/ViewDoctorAppointment";
import Profile from "./Pages/Doctors/Profile";
import ListBlogs from "./Pages/Doctors/ListBlogs";
import DoctorBlogz from "./Pages/Doctors/DoctorBlogz";
import EditBlogs from "./Pages/Doctors/EditBlogs";
import SingleBlog from "./Pages/users/SingleBlog";
import BlogList from "./Pages/users/BlogList";
import UserProfile from "./Pages/users/UserProfile";
import Gif from "./components/Gif";
import UserNotifications from "./Pages/users/UserNotifications";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/applyfordoctoracc" element={<ApplyForDoctorAcc />} />
      <Route path="/successapplyfordoctor" element={<SuccessApplyDoctor />} />
      <Route path="/viewourdoctors" element={<ViewOurDoctors />} />
      <Route path="/search-results" element={<SearchUsers />} />


      <Route path="/gif" element={<Gif />} />


      <Route
        path="/detailedblog/:blogid"
        element={
         
            <SingleBlog/>
         
        }
      />

<Route
        path="/getallblogs"
        element={
         
            <BlogList/>
         
        }
      />



      {/* 
      private Routes component  */}{" "}
      <Route path="" element={<PrivateRoutes />}>
        <Route
          path="/bookDoctorAppointment/:id"
          element={<BookDoctorAppointment />}
        />

<Route
        path="/your-notifications"
        element={
         
            <UserNotifications/>
          
        }
      />


<Route
        path="/myprofile"
        element={
         
            <UserProfile />
         
        }
      />


        <Route path="/view-appointments" element={<ViewAppointments />} />
      </Route>
      {/* 

          AdminRoutes component */}
      {/* 
          AdminRoutes component */}
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/showallusers" element={<ShowAllUsers />} />
        <Route path="/admin/editusers/:userId" element={<EditUsers />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route
          path="/detailedDoctorsVerifyPage/:doctorId"
          element={<DetailedDoctorverify />}
        />
      </Route>
      {/* 
  DoctorRoutes component */}
      {/* DOCTORSpAGES */}
      <Route path="" element={<DoctorsRoutes />}>
        <Route path="/doctorhome" element={<DoctorsHomePage />} />

        <Route
          path="/viewDoctorAppointments"
          element={<ViewDoctorAppointment />}
        />

        <Route path="/doctor/profile" element={<Profile />} />

        <Route path="/createhealthblogs" element={<DoctorBlogz />} />

        <Route path="/yourblogs" element={<ListBlogs />} />

        <Route path="/editblog/:blogId" element={<EditBlogs />} />

        {/* Doctors Blog */}

        {/* <Route
        path="*"
        element={
            <Notfound />
         
        }
      /> */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

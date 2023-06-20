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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/applyfordoctoracc" element={<ApplyForDoctorAcc />} />
      <Route path="/successapplyfordoctor" element={<SuccessApplyDoctor />} />
      <Route path="/viewourdoctors" element={<ViewOurDoctors />} />

      <Route
        path="/search-results"
        element={
          
           <SearchUsers/>
          
        }
      />
      {/* 
      private Routes component  */}{" "}
      <Route path="" element={<PrivateRoutes />}>
        <Route
          path="/bookDoctorAppointment/:id"
          element={<BookDoctorAppointment />}
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

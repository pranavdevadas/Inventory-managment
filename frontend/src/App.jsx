import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./components/adminComponents/AdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let location = useLocation();
  let isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      {isAdminPage ? <AdminHeader /> : <Header />}
      <ToastContainer />
        <Outlet />
    </>
  );
}

export default App;

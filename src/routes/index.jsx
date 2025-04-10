import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AdminRoutes from "./AdminRoutes";

const AllRoutes = () => (
  <>
    <Route path="/" element={<LoginPage />} />
    {AdminRoutes()}
  </>
);

export default AllRoutes;

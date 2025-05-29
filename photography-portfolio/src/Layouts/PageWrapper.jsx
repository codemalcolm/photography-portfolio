import React from "react";
import PageLayout from "./PageLayout";
import { Outlet } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
// import { Navbar } from "../Navigation/Navbar";

const PageWrapper = () => {
  return (
    <>
      <Navbar />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  );
};

export default PageWrapper;

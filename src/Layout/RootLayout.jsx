import React from "react";
import NaVbar from "../Components/NaVbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <NaVbar></NaVbar>
      <main className="min-h-[calc(100vh-447px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;

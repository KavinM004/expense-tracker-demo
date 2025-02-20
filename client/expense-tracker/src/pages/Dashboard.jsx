import React from "react";
import Navbar from "../components/Navbar.jsx";
import Content from "../components/Content.jsx";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "15px", padding: "75px" }}>
        <Content />
      </div>
    </>
  );
};

export default Dashboard;

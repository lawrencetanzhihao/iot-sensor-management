import React from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <h1 className="display-4 mb-3">
            Welcome to IoT Sensor Management Application
          </h1>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Home;

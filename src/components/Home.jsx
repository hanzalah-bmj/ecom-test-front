import React from "react";
import Banner from "./Banner"; // Import the Banner component
import './style.css';

const Home = () => {
  return (
    <div>
      <Banner /> {/* Include the Banner component */}
      <div className="home-content">
        {/* Other content of your home page */}
      </div>
    </div>
  );
};

export default Home;
import React from "react";

const Home = ({ onStartSearch }) => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to the Weather App</h1>
      <p className="home-description">
        Find out the current weather and forecasts for your location!
      </p>
      <button className="start-search-button" onClick={onStartSearch}>
        Go to Search
      </button>
    </div>
  );
};

export default Home;

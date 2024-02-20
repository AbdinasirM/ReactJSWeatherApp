// WeatherInfo.js
import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <p className="card-text">Wind Speed:  m/s</p>
    );
  }

  return (
      <div className=" card col-md-6 d-flex justify-content-center">
        <div className="card-body">
          <h2 className="card-title text-center">{weatherData.name}</h2>
          <p className="card-text">Description: {weatherData.weather[0].description}</p>
          <p className="card-text">Temperature: {weatherData.main.temp}&deg;F</p>
          <p className="card-text">Feels Like: {weatherData.main.feels_like}&deg;F</p>
          <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
          <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    
  );
};

export default WeatherInfo;

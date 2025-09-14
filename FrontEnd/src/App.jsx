import React, { useState, useEffect } from "react";
import SearchInput from "./components/searchInput";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");

  const handleSearchClick = async (inputValue) => {
    try {
      const [city, state, country] = inputValue
        .split(",")
        .map((part) => part.trim());
  
      const response = await fetch(`https://weatherapi.ansir.online/getweatherdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: city,
          state: state,
          country: country,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
  
      const data = await response.json();
      setWeatherData(data);
  
    } catch (error) {
      console.error("Failed to fetch weather data:", error.message);
    }
  };
  
  useEffect(() => {
    // Your useEffect code here...
  }, [weatherData]);


  return (
    <>

        <div>
          <h4>Test2 auto pull</h4>
          <div>
        <SearchInput
          placeholder="City,state,country"
          onClick={handleSearchClick}
        />
      </div>
      </div>

      {weatherData && (
        <>
        <div className="">
          <div className="">
            <div className="card-body p-4 weatherData rounded-4 shadow-lg">
              
                
                  <div className="d-flex">
                    <h2 className="flex-grow-1">{weatherData.name}</h2>
                    <h4>{new Date().toLocaleTimeString()}</h4>
                  </div>

                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <h3
                      className="display-1 mb-0 font-weight-bold"
                      style={{ color: "#1C2331" }}
                    >
                      {weatherData.main.temp}&#176;F
                    </h3>
                    <span  style={{ color: "#1C2331" }}>
                      {weatherData.weather[0].description}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          style={{ color: "#FFFFFF" }}
                        ></i>
                        <span className="ms-1">
                          Wind speed {weatherData.wind.speed} m/s
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          style={{ color: "#0000FF" }}
                        ></i>
                        <span className="ms-1">
                          Humidity {weatherData.main.humidity}%
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-eye fa-fw"
                          style={{ color: "#000" }}
                        ></i>
                        <span className="ms-1">
                          Visibility {(weatherData.visibility * 0.000621371).toFixed(2)} miles
                        </span>
                      </div>
                    </div>
                    <div>
                      {/* Use the dynamic weather icon based on condition */}
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}                        
                        width="100px"
                        alt="Weather Icon"
                      />
                    </div>
                  </div>
               
            </div>
          </div>
        </div>
        </>
              )}
    </>
  );
}

export default App;

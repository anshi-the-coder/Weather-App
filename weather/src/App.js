import React, { useState } from "react";
import "./App.css";

const API_KEY = "your_actual_api_key_here"; // Replace with your OpenWeather API key

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data
  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setWeather(null);
        setError(data.message || "City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather. Please try again later.");
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;

// src/components/WeatherDetails.jsx
import React from 'react'
const WeatherDetails = (props) => {
  const { weather } = props;

  // Check if weather and weather.condition exist to prevent errors
  if (!weather || !weather.condition) {
    return <p>No weather data available</p>;
  }

  // Complete URL for the weather icon
  const iconUrl = `http:${weather.condition.icon}`;

  return (
    <div className="weather-details">
      <h2>{weather.date}</h2>
      <div className="weather-info">
        <img src={iconUrl} alt={weather.condition.text} />
        <p>Average Temperature: {weather.avgTemperature}°F</p>
        <p>Condition: {weather.condition.text}</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
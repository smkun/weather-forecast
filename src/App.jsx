// App.jsx
import React from "react";
import "./App.css";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDetails from "./components/WeatherDetails";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, 10);
  }, [coordinates, map]);

  return null;
};

const App = () => {
  const [weather, setWeather] = useState([]);
  const [coordinates, setCoordinates] = useState([38.99, -77.53]); // starting coordinates
  const [locationInfo, setLocationInfo] = useState({ city: '', state: '' });

  const fetchData = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();
      console.log('Fetched data:', data);
      if (data.forecast && data.forecast.forecastday) {
        const newWeatherState = data.forecast.forecastday.map((day) => ({
          date: day.date,
          location: data.location.name,
          region: data.location.region,
          avgTemperature: day.day.avgtemp_f,
          condition: day.day.condition,
        }));
        setWeather(newWeatherState);
        setCoordinates([data.location.lat, data.location.lon]); // Set coordinates from the API response
        setLocationInfo({ city: data.location.name, state: data.location.region });
      } else {
        console.log('Forecast data not available');
        setWeather([]);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather([]);
    }
  };

  useEffect((weather) => {
    console.log('Weather state:', weather);
    fetchData('Boston');
  }, []);

  console.log("State:", weather);

  return (
    <main>
      <h1 className="typing-text">
      Get the three day weather forecast for any city!
      </h1>
      <WeatherSearch fetchData={fetchData} />

      {locationInfo.city && (
        <h2>Weather for {locationInfo.city}, {locationInfo.state}</h2>
      )}

      <div className="weather-details-container">
        {weather.map((day, index) => (
          <WeatherDetails key={index} weather={day} />
        ))}
      </div>
      <div className="map-container">
        <MapContainer center={coordinates} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}></Marker>
          <MapComponent coordinates={coordinates} />
        </MapContainer>
      </div>
    </main>
  );
};

export default App;
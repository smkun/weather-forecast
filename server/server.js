// server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;
console.log(API_KEY);
const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=3`;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    try {
      const response = await axios.get(`${BASE_URL}&q=${city}`);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
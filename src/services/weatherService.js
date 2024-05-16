const API_KEY = '7e10899b15a445cd9b0140617241505';
const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=3`;

const show = async (city) => {
  try {
    const queryString = `&q=${city}`;
    const res = await fetch(BASE_URL + queryString);
    const data = await res.json();
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { show };
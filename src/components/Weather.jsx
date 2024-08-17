import React, { useState } from 'react'
import axios from 'axios';

function Weather() {

  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'b55250f9a1a890354107a8d8bc1fc0ad'}`)
      setWeather(response);
    }
    catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const handleClick = () => {
    if (city.trim()) {
      fetchWeather();
    } else {
      setError("Please enter a city name.");
    }
  }

  return (
    <div className="weather-container">
      <input type="text" placeholder='Enter City Name' value={city} onChange={handleCityChange}/>

      <button onClick={handleClick}>Get Weather</button>
      {weather && <>
        <div className='weather-info'>
          <h3>{weather.data.name}</h3>
          <p>Temperature Is: {Math.round(weather.data.main.temp)}°F</p>
          <p>{weather.data.weather[0].description}</p>
        </div>
      </>}
    </div>
  )
}

export default Weather

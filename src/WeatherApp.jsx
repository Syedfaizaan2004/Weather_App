import React, { useState } from 'react';
import SearchBox from './SearchBox';
import Infobox from './infobox';
// import { useState } from 'react';

const WeatherApp = () => {
    const [weatherInfo, setWeatherInfo] = useState ({
        city: "Bihar",
        feelsLike: 24.84,
        temp: 25.08,
        tempMin: 25.05,
        tempMax: 25.04,
        humidity: 47,
        weather: "haze",
      });

      let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
      }

  return (
    <div style={{textAlign: "center"}}>
        <h1>Weather App</h1>
        <SearchBox updateInfo={updateInfo}/>
        <Infobox info={weatherInfo}/>
    </div>
  );
}

export default WeatherApp
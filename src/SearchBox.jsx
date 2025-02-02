import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './searchbox.css'
import Alert from '@mui/material/Alert';

const SearchBox = ({ updateInfo }) => {

    let [city, setCity] = useState(" ");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "8b008df676caeab91f21aa663032bc43";

    let getWeatherInfo = async() => {
       try {
          let response = await fetch (`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
          let jsonRespone = await response.json();
          // console.log(jsonRespone);
          let result = {
            city: city,
            temp: jsonRespone.main.temp,
            tempMin: jsonRespone.main.temp_min,
            tempMax: jsonRespone.main.temp_max,
            humidity: jsonRespone.main.humidity,
            feelsLike: jsonRespone.main.feels_like,
            weather: jsonRespone.weather[0].description,
          };
          console.log(result);
          return result;
       } catch (error) {
        // setError("No such place in our data base.");
        throw error;
       }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
      try {
        event.preventDefault();
        console.log(city);
        setCity(" ");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
      } catch (error) {
        setError(true);
      }
    };
  return (
    <div className='Searchbox'>
        {/* <h3>Search for the Weather</h3> */}
        <form onSubmit={handleSubmit}>
        <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
        <br /><br />
        <Button variant="contained" type='submit'>Search</Button>
        {error && <p style={{color: "red"}}>No such place exists!</p>}
        </form>
    </div>
  )
}

export default SearchBox
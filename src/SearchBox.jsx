import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './searchbox.css';

const SearchBox = ({ updateInfo }) => {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "8b008df676caeab91f21aa663032bc43";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json(); // Corrected the typo

            if (jsonResponse.cod !== 200) {
                throw new Error(jsonResponse.message);
            }

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            return result;
        } catch (error) {
            throw error;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            let newInfo = await getWeatherInfo();
            setCity(""); // Reset after successful fetch
            updateInfo(newInfo);
        } catch (error) {
            setError(true);
            setErrorMessage(error.message || 'City not found!');
        }
    };

    const handleCloseSnackbar = () => {
        setError(false);
    };

    return (
        <div className='Searchbox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type='submit'>Search</Button>
            </form>

            <Snackbar open={error} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SearchBox;

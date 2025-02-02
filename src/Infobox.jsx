import React from 'react'
import './infobox.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Infobox = ({ info }) => {
  const RAIN_URL = "/Rain_Image.jpg";
  const HOT_URL = "/Summer_Image.jpg";
  const COLD_URL = "/Winter_Image.jpeg";

  return (
    <div className="infoBox">
      <div className="cardContent">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="230"
          image={
            info.humidity > 80
            ? RAIN_URL
            : info.temp > 15
            ?HOT_URL
            :COLD_URL
          }
          alt="weather image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city} {
            info.humidity > 80
            ? <ThunderstormIcon/>
            : info.temp > 15
            ?<WbSunnyIcon/>
            :<AcUnitIcon/>
          }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
            <p>Temperatur = {info.temp} &deg;C</p>
            <p>Humidity = {info.humidity}</p>
            <p>Min Temp = {info.tempMin}</p>
            <p>Max Temp = {info.tempMax}</p>
            <p>
              The weather can be described as <i>{info.weather}</i> and feels feelsLike
               {info.feelsLike} &deg;C 
            </p>
          </Typography>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default Infobox
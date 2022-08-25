import React from 'react'


const WeatherAtTime = ({ data }) => {

    const hour = new Date(data.dt_txt.split(' ').join('T')).getHours();

    return (
        <div className='weather-at-time'>
            <span> { (hour>9) ? hour : ('0'+hour) }:00 </span>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
            <span> {data.weather[0].description} </span>
            <span> {data.main.temp}° </span>
        </div>
    )
}

export default WeatherAtTime
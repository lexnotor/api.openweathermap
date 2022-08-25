import React from 'react'
import WeatherAtTime from '../WeatherAtTime';


const TodayWeather = ({ data, city }) => {

    const [timeNow, ...forecast] = data;

    return (
        <div className='today'>
            <h1 className='city-name'> {city.name} </h1>
            <div className='today-proprety'>
                <img
                    src={`http://openweathermap.org/img/w/${timeNow.weather[0].icon}.png`}
                    alt=""
                />
                <div className='today-weather'>
                    <span> {timeNow.main.temp}° </span>
                    <span> {timeNow.weather[0].description} </span>
                </div>
                <div className='today-forecast'>
                    {
                        forecast.map( (elm, id) => <WeatherAtTime key={id} data={elm} /> )
                    }
                </div>
            </div>
        </div>
    )
}

export default TodayWeather
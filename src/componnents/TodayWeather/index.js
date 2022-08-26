import React from 'react'
import WeatherAtTime from '../WeatherAtTime';
import './style.css'
import { images } from '../../images'


const TodayWeather = ({ data, city }) => {
    const acceptedTime = { 6: true, 12: true}
    let [timeNow, ...forecast] = data;
    forecast = forecast.filter((elm) => acceptedTime[new Date(elm.dt_txt.split(' ').join('T')).getHours()])

    return (
        <div className='today'>
            <h1 className='city-name'> {city.name} </h1>
            <div className='today-proprety'>
                <img
                    src={images[`${timeNow.weather[0].icon}`]}
                    alt=""
                />
                <div className='today-weather'>
                    <span> {timeNow.main.temp}° </span>
                    <span> {timeNow.weather[0].description} </span>
                </div>
            </div>
            <div className='today-forecast'>
                {
                    forecast.map((elm, id) => <WeatherAtTime key={id} data={elm} />)
                }
            </div>
        </div>
    )
}

export default TodayWeather
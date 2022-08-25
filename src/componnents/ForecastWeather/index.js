import React from 'react'
import WeatherAtTime from '../WeatherAtTime';

const ForecastWeather = ({ data }) => {

    const getFormatDate = (day) => {
        const date = new Date(day.dt_txt.split(' ').join('T'));
        return `${date.getDay()}/${date.getMonth()}`
    }

    return (
        <div className='forecast-container'>
            {
                data.map(
                    (weathers) => {
                        return ( 
                        <div className='day-forecast'>
                            <h2> {getFormatDate(weathers[0])} </h2>

                            <div>
                                { weathers.map( (elm, id) => <WeatherAtTime key={id} data={elm} />)}
                            </div>
                        </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default ForecastWeather
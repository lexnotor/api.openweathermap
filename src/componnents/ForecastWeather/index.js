import React from 'react'
import WeatherAtTime from '../WeatherAtTime';

const ForecastWeather = ({ data }) => {

    const getFormatDate = (day) => {
        const date = new Date(day.dt_txt.split(' ').join('T'));
        return `${date.getDate()}/${date.getMonth()}`
    }

    return (
        <div className='forecast-container'>
            {
                data.map(
                    (weathers, id1) => {
                        return ( 
                        <div className='day-forecast' key={id1}>
                            <h2> {getFormatDate(weathers[0])} </h2>

                            <div>
                                { weathers.map( (elm, id2) => <WeatherAtTime key={id2} data={elm} />)}
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
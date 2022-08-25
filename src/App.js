import React, { Component } from 'react';
import './App.css';
import ForecastWeather from './componnents/ForecastWeather';
import Header from './componnents/Header';
import TodayWeather from './componnents/TodayWeather';

class App extends Component {
    // https://api.openweathermap.org/data/2.5/forecast?lat=-1.658684&lon=29.214632&lang=fr&cnt=3&appid=6eac00827ba26067a8316bc5e656aea8
    // http://openweathermap.org/img/w/10d.png
    // 6:00 12:00 18:00
    state = {
        key: '6eac00827ba26067a8316bc5e656aea8',
        lat: -1.658684,
        lon: 29.214632,
        climat: [[]],
        city: '',
        founded: false
    }

    trier = (data) => {
        let [curentDate, index] = [0, -1];
        let newData = [];

        data.list.forEach((value) => {
            const date = new Date(value.dt_txt.split(' ').join('T')).getDate();

            if (curentDate !== date) {
                index++;
                newData.push([]);
                curentDate = date;
            }
            newData[index].push(value);
        });

        this.setState({ climat: newData.slice(0, 4), city: data.city });
    }

    componentDidMount() {
        const { lat, lon, key } = { ...this.state, cnt: 3 };
        const query = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${key}`;
        fetch(query)
            .then(response => response.json())
            .then(data => this.trier(data))
            .catch(error => console.log(error))
    }

    render() {

        return (
            <>
                <Header />
                {
                    this.state.founded ?
                        <div>
                            <TodayWeather 
                                data={this.state.climat[0]}
                                city={this.state.city}/>
                            <ForecastWeather 
                                data={this.state.climat.slice(1)}
                            />
                        </div>
                        :
                        <div className='loading'> Not Found</div>
                }
            </>
        )
    }
}

export default App;

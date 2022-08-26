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
        ville: 'Goma',
        climat: [[]],
        city: '',
        founded: false,
        finishRequest: true
    }

    acceptedTime = {6: true, 12: true, 18: true}

    trier = (data) => {
        this.setState({ finishRequest: true });
        if(!data.list) return
        let [curentDate, index] = [0, -1];
        let newData = [];

        data.list.forEach((value) => {
            const date = new Date(value.dt_txt.split(' ').join('T'));
            const now = new Date();

            if (curentDate !== date.getDate()) {
                index++;
                newData.push([]);
                curentDate = date.getDate();
            }
            if(this.acceptedTime[date.getHours()] || now.getDay() === date.getDay())
                newData[index].push(value);
        });

        this.setState({ climat: newData.slice(0, 3), city: data.city, founded: true });
    }

    request () {
        const { ville, key } = { ...this.state};
        const query = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&units=metric&lang=fr&appid=${key}`;
        this.setState({ finishRequest: false });
        fetch(query)
            .then(response => response.json())
            .then(data =>{
                this.trier(data);
            })
            .catch((erro) => {
                console.log(erro)
                this.setState({ finishRequest: true })
            })
    }

    componentDidMount() {
        this.request();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.ville !== this.state.ville) {
            this.setState({founded: false})
            this.request()
        }
    }

    changeVille = (ville) => {
        this.setState({ville: ville})
    }

    render() {

        return (
            <>
                <Header changeVille={this.changeVille} />
                {
                    this.state.founded ?
                        <div className='body'>
                            <TodayWeather 
                                data={this.state.climat[0]}
                                city={this.state.city}/>
                            <ForecastWeather 
                                data={this.state.climat.slice(1)}
                            />
                        </div>
                        :
                        (<div className={this.finishRequest ? 'nofound' : 'loading'}>  </div>)
                }
            </>
        )
    }
}

export default App;

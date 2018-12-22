import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import DaylyWeather from './DaylyWeather';
import HourlyWeather from './HourlyWeather';
import DetailedWeather from './DetailedWeather';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            isLoaded: false,
            error: null,
            scale: 'c',
        }

        this.onRadioChange = this.onRadioChange.bind(this);
    }

    componentDidMount() {

        const lat = this.props.lat;
        const lon = this.props.lon;

        fetch(`/weather-daily/${lat}/${lon}`)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                this.setState({ 
                    isLoaded: true,
                    weather: result,
                })
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.setState({
                isLoaded: false,
            })

            const lat = this.props.lat;
            const lon = this.props.lon;

            fetch(`/weather-daily/${lat}/${lon}`)
                .then(result => result.json())
                .then(result => {
                    // console.log(result)
                    this.setState({ 
                        isLoaded: true,
                        weather: result,
                    })
                });
        }
    }

    onRadioChange = (event) => {
        this.setState({
            scale: event.target.value,
        })
    }

    render() {
        const weather = this.state.weather,
            scale = this.state.scale;

        let dailyWeaher,
            hourlyWeather,
            datailedWeather;
        
        const isLoaded = this.state.isLoaded;
        
        if (isLoaded) {
            // console.log(this.state.weather);
            dailyWeaher = weather.daily.data.map((dayWeather, index) => (
                <DaylyWeather key={index} {...dayWeather} scale={scale}/>
            ))

            datailedWeather = <DetailedWeather {...weather.currently} scale={scale}/>
        } else {
            dailyWeaher = <h2 className="uk-align-center">Loading...</h2>;
        }
        return(
            <div>
                <h2>Погода в {this.props.city}</h2>
                <div className="uk-margin-auto uk-child-width-auto uk-grid uk-grid-small uk-align-center">
                    <span>Единицы измерения: </span>
                    <label>
                        <input 
                            className="uk-radio" 
                            type="radio" 
                            name="scale" 
                            value="c" 
                            defaultChecked 
                            onChange={this.onRadioChange} 
                        />
                        &#8451;
                    </label>
                    <label>
                        <input 
                            className="uk-radio" 
                            type="radio" 
                            name="scale" 
                            value="f" 
                            onChange={this.onRadioChange}
                        />
                        &#8457;
                    </label>
                </div>

                <div className="uk-position-relative" uk-slider="true">
                    <ul className="uk-slider-items uk-child-width-1-3">
                        {dailyWeaher}
                    </ul>                    
                    <FontAwesomeIcon icon={faArrowLeft} className="uk-position-center-left uk-link" uk-slider-item="previous"/>
                    <FontAwesomeIcon icon={faArrowRight} className="uk-position-center-right uk-link" uk-slider-item="next"/>
                </div>

                <div className="uk-position-relative" uk-slider="true">
                    <ul className="uk-slider-items uk-child-width-1-3">
                    </ul>                    
                    <FontAwesomeIcon icon={faArrowLeft} className="uk-position-center-left uk-position-small uk-hidden-hover" uk-slider-item="previous"/>
                    <FontAwesomeIcon icon={faArrowRight} className="uk-position-center-right uk-position-small uk-hidden-hover" uk-slider-item="next"/>
                </div>
                {datailedWeather}
                
            </div>
        )

    }
}

export default Result;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import DaylyWeather from './DaylyWeather';
import HourlyWeather from './HourlyWeather';
import DetailedWeather from './DetailedWeather';
import moment from 'moment';

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
            dailyIsLoaded: false,
            dateIsSelect: false,
            selectedUnixDate: null,
            hourlyIsLoaded: false,
            hourlyWeather: {},
            timeIsSelect: false,
            selectedUnixTime: null,
            error: null,
            scale: 'c',
        }

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
    }

    componentDidMount() {

        const lat = this.props.lat;
        const lon = this.props.lon;

        fetch(`/weather-daily/${lat}/${lon}`)
            .then(result => result.json())
            .then(result => {
                if (result.error) {
                    this.setState({
                        error: result.error
                    })
                } else {
                    this.setState({ 
                        dailyIsLoaded: true,
                        weather: result,
                    })
                }
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.setState({
              dailyIsLoaded: false,
              dateIsSelect: false,
              timeIsSelect: false,
            });

            const lat = this.props.lat,
                lon = this.props.lon;

            fetch(`/weather-daily/${lat}/${lon}`)
                .then(result => result.json())
                .then(result => {
                  if (result.error) {
                    this.setState({
                      error: result.error,
                    });
                  } else {
                    this.setState({ 
                        dailyIsLoaded: true,
                        weather: result,
                    })
                  }
                });
        }
    }

    onRadioChange = (event) => {
        this.setState({
            scale: event.target.value,
        })
    }

    onDateClick = (time) => {
        const lat = this.state.weather.latitude,
            lon = this.state.weather.longitude;

        this.setState({
            hourlyIsLoaded: false,
            dateIsSelect: true,
            selectedUnixDate: time,
            timeIsSelect: false,
            selectedUnixTime: null,
        })

        fetch(`/weather-hourly/${lat}/${lon}/${time}`)
            .then(result => result.json())
            .then(result => {
              if (result && result.error) {
                this.setState({
                  error: result.error,
                });
              } else {
                this.setState({ 
                    hourlyIsLoaded: true,
                    hourlyWeather: result,
                });
              }
            });

    }
    onHourlyClick = time => {
        this.setState({
            timeIsSelect: true,
            selectedUnixTime: time,
        })


    }

    render() {
        const weather = this.state.weather,
            scale = this.state.scale,
            dailyIsLoaded = this.state.dailyIsLoaded,
            hourlyIsLoaded = this.state.hourlyIsLoaded,
            dateIsSelect = this.state.dateIsSelect,
            selectedUnixDate = this.state.selectedUnixDate,
            timeIsSelect = this.state.timeIsSelect,
            selectedUnixTime = this.state.selectedUnixTime;

        let dailyWeaher,
            hourlyWeather,
            currentWeather,
            detailedWeather;

        moment.locale('ru');
        const date = moment(selectedUnixDate * 1000),
            dayOfWeek = date.format('ddd'),
            monthDay = date.format('D'),
            month = date.format('MMM');

        if (dailyIsLoaded) {
            dailyWeaher = weather.daily.data.map((dayWeather, index) => (
                <DaylyWeather key={index} {...dayWeather} scale={scale} onClick={this.onDateClick}/>
            ))

            currentWeather = <DetailedWeather {...weather.currently} scale={scale}/>
        } else {
            dailyWeaher = <h2 className="uk-align-center">Loading...</h2>;
        }

        if (hourlyIsLoaded && dateIsSelect) {
            hourlyWeather = this.state.hourlyWeather.data.map((hourWeather, index) => (
                <HourlyWeather key={index} {...hourWeather} scale={scale} onClick={this.onHourlyClick} />
            ))
        } else if (!hourlyIsLoaded && dateIsSelect) {
            hourlyWeather = <h2 className="uk-align-center">Loading...</h2>;
        }

        if (timeIsSelect) {
            for (let i = 0; i < this.state.hourlyWeather.data.length; i++) {
                const hourWeather = this.state.hourlyWeather.data[i];

                if (selectedUnixTime === hourWeather.time) {
                    detailedWeather = <DetailedWeather {...hourWeather} scale={scale}/>
                    break;
                }
            }
        }

        return(
            <section>
            <h2>Погода в {this.props.city}</h2>
                <form className="uk-margin-auto uk-child-width-auto uk-grid uk-grid-small uk-align-center">
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
                </form>

                {currentWeather}

                <section className="uk-position-relative uk-section" uk-slider="true">
                    <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid uk-grid-small uk-grid-match">
                        {dailyWeaher}
                    </ul>                    
                    <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" className="uk-position-center-left uk-link" uk-slider-item="previous"/>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="2x" className="uk-position-center-right uk-link" uk-slider-item="next"/>
                </section>

                <section className="uk-position-relative uk-section" uk-slider="true">
                    {dateIsSelect ? <h3>Погода {dayOfWeek}, {monthDay} {month}</h3> : null}
                    <ul className="uk-slider-items uk-child-width-1-3@s uk-child-width-1-5@m uk-child-width-1-6@l uk-nav">
                        {hourlyWeather}
                    </ul>                    
                    <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" className="uk-position-center-left uk-position-small uk-link" uk-slider-item="previous"/>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="2x" className="uk-position-center-right uk-position-small uk-link" uk-slider-item="next"/>
                </section>

                {detailedWeather}

            </section>
        )

    }
}

export default Result;
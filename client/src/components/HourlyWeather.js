import React from 'react';
import moment from 'moment';

const HourlyWeather = props => {
    const celsiusToFahrenheit = degrees => degrees * (9 / 5) + 32;

    moment.locale('ru');
    const date = moment(props.time * 1000),
        displayTime = `${date.format('HH')}:${date.format('mm')}`,

        scale = props.scale,

        maxTemp = scale === 'c' ? props.temperatureHigh : celsiusToFahrenheit(props.temperatureHigh),
        maxTempTime = moment(props.temperatureHighTime * 1000),
        maxTempTimeDisplay = `${maxTempTime.format('HH')}:${maxTempTime.format('mm')}`,

        minTemp = scale === 'c' ? props.temperatureLow : celsiusToFahrenheit(props.temperatureLow),
        minTempTime = moment(props.temperatureLowTime),
        minTempTimeDisplay = `${minTempTime.format('HH')}:${minTempTime.format('mm')}`,

        condition = props.summary;

        return (
            <li className="uk-card uk-card-default">
                <div className="uk-card-title">
                    <p>{displayTime}</p>
                </div>
                <div className="uk-card-body">
                    <p>{condition}</p>
                    <p>{Math.round(maxTemp)}{scale} in {maxTempTimeDisplay}</p>
                    <p>{Math.round(minTemp)}{scale} in {minTempTimeDisplay}</p>
                </div>
            </li>
        )
}

export default HourlyWeather;
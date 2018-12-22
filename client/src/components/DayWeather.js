import React from 'react';
import moment from 'moment';
import '../../node_modules/moment/locale/ru';

const DayWeather = props => {
    const celsiusToFahrenheit = degrees => degrees * (9 / 5) + 32;

    moment.locale('ru');
    const date = moment(props.time * 1000),
        dayOfWeek = date.format('ddd'),
        monthDay = date.format('D'),
        month = date.format('MMM'),

        scale = props.scale,

        maxTemp = scale === 'c' ? props.temperatureHigh : celsiusToFahrenheit(props.temperatureHigh),
        maxTempTime = moment(props.temperatureHighTime * 1000),
        maxTempTimeDisplay = `${maxTempTime.format('HH')}:${maxTempTime.format('mm')}`,

        minTemp = scale === 'c' ? props.temperatureLow : celsiusToFahrenheit(props.temperatureLow),
        minTempTime = moment(props.temperatureLowTime),
        minTempTimeDisplay = `${minTempTime.format('HH')}:${minTempTime.format('mm')}`,

        condition = props.summary;
    // const iconPath = props.day.condition.icon.slice(15);

    return (
        <li className="uk-card uk-card-default">
            <div className="uk-card-title">
                <p>{dayOfWeek}, {monthDay} {month}</p>
            </div>
            <div className="uk-card-body">
                <p>{condition}</p>
                <p>{Math.round(maxTemp)}{scale} in {maxTempTimeDisplay}</p>
                <p>{Math.round(minTemp)}{scale} in {minTempTimeDisplay}</p>
            </div>
        </li>
    )
}

export default DayWeather;
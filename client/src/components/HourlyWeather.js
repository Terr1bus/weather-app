import React from 'react';
import moment from 'moment';

const HourlyWeather = props => {
    const celsiusToFahrenheit = degrees => degrees * (9 / 5) + 32;
    const getTemp = propName => (scale === 'c') ? Math.round(props[propName]) : Math.round(celsiusToFahrenheit(props[propName]));

    moment.locale('ru');
    const date = moment(props.time * 1000),
        displayTime = `${date.format('HH')}:${date.format('mm')}`,

        scale = props.scale,

        temperature = getTemp('temperature'),
        apparentTemperature = getTemp('apparentTemperature'),

        condition = props.summary;

    const onClick = () => {
        props.onClick(props.time);
    }

    // console.log(props);
        return (
            <li className="uk-card uk-card-small uk-card-hover card-pointer" onClick={onClick}>
                <time className="uk-card-title">
                    <p>{displayTime}</p>
                </time>
                <div className="uk-card-body">
                    <p>{condition}</p>
                    <p>Температура: {temperature} {scale}</p>
                    <p>Ощущается: {apparentTemperature} {scale}</p>
                </div>
                <div className="uk-card-footer uk-link">Подробнее</div>
            </li>
        )
}

export default HourlyWeather;
import React from 'react';
import moment from 'moment';

const DetailedWeather = props => {
    const celsiusToFahrenheit = degrees => degrees * (9 / 5) + 32;
    const getTemp = propName => scale === 'c' ? props[propName] : celsiusToFahrenheit(props[propName]);

    moment.locale('ru');
    const date = moment(props.time * 1000),
        displayTime = `${date.format('HH')}:${date.format('mm')}`,

        scale = props.scale,

        temperature = getTemp('temperature'),
        apparentTemperature = getTemp('apparentTemperature'),
        dewPoint = getTemp('dewPoint'),

        condition = props.summary;

    return (
        <div className="uk-container">
            <h3 className="uk-align-center uk-width-1-1">{displayTime}</h3>
            <h4 className="uk-align-center uk-width-1-1">{condition}</h4>
            <div className="" uk-grid="true">
                <ul className="uk-list uk-width-1-2">
                    <li>Температура: {temperature} {scale}</li>
                    <li>Ощущается: {apparentTemperature} {scale}</li>
                    <li>Вероятность осадков: {props.precipProbability}%</li>
                    <li>Интенсивность осадков: {props.precipIntensity} мм/ч</li>
                    <li>Точка росы: {dewPoint} {scale}</li>
                    <li>Влажность: {props.humidity}%</li>
                    <li>Давление: {props.pressure} Па</li>
                </ul>
                <ul className="uk-list uk-width-1-2">
                    <li>Скорость ветра: {props.windSpeed} м/с</li>
                    <li>Порывы ветра: {props.windGust} м/с</li>
                    <li>Направление ветра: {props.windBearing}</li>
                    <li>Облачность: {props.cloudCover}</li>
                    <li>У/ф индекс: {props.uvIndex}</li>
                    <li>Видимость: {props.visibility}</li>
                    <li>Озон: {props.ozone}</li>
                </ul>
            </div>
        </div>
    )
}

export default DetailedWeather;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Input = (props) => {
    const onChange = event => {
        const value = event.target.value;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        if (inputLength === 0) {
            return [];
        }

        props.onChange(event.target.value);
    }

    return (
        <div className="uk-inline uk-margin-top">
            <span className="uk-form-icon uk-position-center-left">
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input 
                className="uk-input uk-text-center" 
                onChange={onChange} 
                placeholder="Type a city name"
            />
        </div>
    )
}

export default Input;
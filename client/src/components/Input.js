import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = event => {
        const value = event.target.value;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        if (inputLength === 0) {
            return [];
        }

        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <input 
                className="uk-input uk-text-center uk-width-1-3 uk-margin-top" 
                onChange={this.onChange} 
                placeholder="Type a city name"
            />
        )
    }
}
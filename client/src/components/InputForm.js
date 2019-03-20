import React from 'react';
import Input from './Input';
import Suggestion from './Suggestion';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            city: '',
            suggestionsVisible: false,
        }

        this.onSuggestionClick = this.onSuggestionClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onSuggestionClick = (suggestion, lat, lon) => {
        this.setState({
            city: suggestion,
            suggestionsVisible: false,
        })

        this.props.onSuggestionClick(suggestion, lat, lon);
    }

    onInputChange = value => {
      fetch(`/city/${value}`)
        .then(result => result.json())
        .then(result => {
            this.setState({
                suggestions: result,
                suggestionsVisible: true,
            })
        })
    }

    render() {
        let suggestions;

        if (this.state.suggestionsVisible) {
            suggestions = this.state.suggestions.map((suggestion, index) => (
                <Suggestion key={index} onClick={this.onSuggestionClick} {...suggestion} />
            ))
        }

        return (
            <div className="uk-container-small uk-margin-auto uk-border-rounded">
                <Input onChange={this.onInputChange}/>
                <ul className="uk-list">
                    {suggestions}
                </ul>
            </div>
        )
    }
}
import React from 'react';

export default class Suggestion extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = event => {
        this.props.onClick(this.props.display_name, this.props.lat, this.props.lon);
    }

    render() {
        return (
            <li onClick={this.onClick} className="uk-link">
                {this.props.display_name}
            </li>
        )
    }
}
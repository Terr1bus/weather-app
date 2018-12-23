import React, { Component } from 'react';
import InputForm from './components/InputForm';
import Result from './components/Result';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      city: null,
      lat: null,
      lon: null,
    }

    this.onSuggestionClick = this.onSuggestionClick.bind(this);
  }

  onSuggestionClick = (suggestion, lat, lon) => {
    // console.log(suggestion);
    this.setState({
      city: suggestion,
      lat,
      lon,
    })
  }

  render() {
    const city = this.state.city,
      lat = this.state.lat,
      lon = this.state.lon,
      dateIsSelect = this.state.dateIsSelect;
    // console.log(this.state.city);
    return (
      <div className="App uk-container uk-margin-auto">
        <InputForm onSuggestionClick={this.onSuggestionClick} />
        <div>
          {city ? <Result city={this.state.city} lat={lat} lon={lon} dateIsSelect={dateIsSelect} onDateClick={this.onDateClick} /> : null }
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default App;
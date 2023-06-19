import React from "react";
import logo from "./logo.png";
import axios from "axios";
import backgroundDay from "./assets/background-day.jpg";
import backgroundNight from "./assets/background-night.jpg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCityValue: "",
      currentCity: "",
      currentTemp: "",
      currentFeelsLike: "",
      currentWeather: "",
      currentWeatherIcon: "",
      backgroundImg: backgroundDay,
    };
  }

  renderBackgroundImage = () => {
    const todaysDate = new Date();
    const currentTime = todaysDate.getHours();

    // if time is between 6am to 6pm, use bg-day
    if (currentTime >= 6 && currentTime < 18) {
      this.setState({
        backgroundImg: backgroundDay,
      });
    } else {
      this.setState({
        backgroundImg: backgroundNight,
      });
    }
  };

  componentDidMount() {
    this.renderBackgroundImage();
  }

  // Handle change function to store current user's input in state
  handleInputChange = (event) => {
    this.setState({
      inputCityValue: event.target.value,
    });
  };

  // [LOCATION COORDS] First API request to retrieve user inputted city's coordinates
  getLocationCoordinates = () => {
    // in getLocationCoordinates function, it is making an API call using axios.get() which returns a Promise. Without the 'return' statement, the function does not return anything explicitly. As a result when we call this.getLocationCoordinates() it does not deliver the Promise that we expect for it to be chained to .then() and .catch() blocks.
    // alternatively we can aviod the return keyword by removing the curly braces defined at the top^ after =>
    return axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.inputCityValue}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )

      .then((response) => {
        console.log(response.data[0]);
        const currLocationLat = response.data[0].lat;
        const currLocationLon = response.data[0].lon;
        console.log(`lat: `, currLocationLat);
        console.log(`lon: `, currLocationLon);
        // return within .then() for the values to be used as the fulfillment value of the Promise in subsequent .then() block!
        return { lat: currLocationLat, lon: currLocationLon };
      });
  };

  // [CURRENT WEATHER] Second API request to retrieve current weather based on "getLocationCoordinates" lat & long data.
  getCurrentWeather = () => {
    this.getLocationCoordinates()
      .then((locationCoords) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        // calling "data:" is an object literal in JavaScript, where the return API's "data" property will be given the variable name "currentWeatherData". For more info, console.log(response) to see the full list of API's object and from there we can find "data" property.
        const { data: getWeatherData } = response;
        console.log(`current weather data: `, getWeatherData);

        // we then update the state with the information retrieved from the API's data (aka currentWeatherData)!
        this.setState({
          currentCity: getWeatherData.name,
          currentTemp: getWeatherData.main.temp,
          currentFeelsLike: getWeatherData.main.feels_like,
          currentWeather: getWeatherData.weather[0].description,
          currentWeatherIcon: getWeatherData.weather[0].icon,
          // currentWeatherIcon: ,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getLocationCoordinates();
    this.getCurrentWeather();

    this.setState({
      // reset input value after clicking submit button
      inputCityValue: "",
    });
  };

  render() {
    const {
      backgroundImg,
      currentCity,
      currentTemp,
      currentFeelsLike,
      currentWeather,
      currentWeatherIcon,
    } = this.state;

    const weatherIconImg = `https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;

    const renderWeatherInfo = currentCity ? (
      <div>
        <img src={weatherIconImg} alt="weather icon" />
        <p>Current City: {currentCity}</p>
        <p>Current Temperature: {currentTemp}</p>
        <p>Feels Like: {currentFeelsLike}</p>
        <p>Current Weather: {currentWeather}</p>
      </div>
    ) : (
      <p>Enter a city to check weather 🌤🌧☃️</p>
    );

    return (
      <div className="App">
        <header
          className="App-header"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <form>
            <input
              type="text"
              placeholder="Name of City"
              onChange={this.handleInputChange}
              value={this.inputCityValue}
            />
            <button onClick={this.handleSubmit}>Check Weather</button>
          </form>
          {renderWeatherInfo}
        </header>
      </div>
    );
  }
}

export default App;

// STEPS
// 1) make an input using form that accepts both input field (placeholder"enter a city name") & submit button

// 2) the input accepts a users input, capturing the city
// - based on user's input, retrieve weather from API and store it in state

// 3) Capture the information inside state

// 4) Make a button

// 5) When the user clicks on the button, it will fire off the API requests

// 6) Right now capturing a city name - find API that takes the city name to spit out lat and long

// 7) After we receive the country information, we call the weather API with the lat and long

// 8) display the information
// -- ensure that temperature is in celsius not Kelvin.
// -- display a weather icon next to the weather temp

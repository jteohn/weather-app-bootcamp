import React from "react";
import axios from "axios";
import backgroundDay from "./assets/background-day.jpg";
import backgroundNight from "./assets/background-night.jpg";
import CurrWeather from "./components/CurrWeather";
import ForecastWeather from "./components/ForecastWeather";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCityValue: "",
      currentCity: "",
      currentTemp: "",
      currentFeelsLike: "",
      currentWeatherDesc: "",
      currentWeatherIcon: "",
      currentDate: "",
      // DAY 2
      day2Date: "",
      day2Temp: "",
      day2WeatherDesc: "",
      day2WeatherIcon: "",
      // DAY 3
      day3Date: "",
      day3Temp: "",
      day3WeatherDesc: "",
      day3WeatherIcon: "",
      // DAY 4
      day4Date: "",
      day4Temp: "",
      day4WeatherDesc: "",
      day4WeatherIcon: "",
      // DAY 5
      day5Date: "",
      day5Temp: "",
      day5WeatherDesc: "",
      day5WeatherIcon: "",
      currentPage: "home",
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

  handlePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

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

        // update the state with the information retrieved from the API's data (aka currentWeatherData)!
        this.setState({
          currentCity: getWeatherData.name,
          currentTemp: getWeatherData.main.temp,
          currentFeelsLike: getWeatherData.main.feels_like,
          currentWeatherDesc: getWeatherData.weather[0].description,
          currentWeatherIcon: getWeatherData.weather[0].icon,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  getForecastData = () => {
    this.getLocationCoordinates()
      .then((locationCoords) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: getForecastData } = response;
        console.log(`forecast: `, getForecastData);

        // update state
        this.setState({
          currentDate: getForecastData.list[0].dt_txt,
          // DAY 2
          day2Date: getForecastData.list[3].dt_txt,
          day2Temp: getForecastData.list[3].main.temp,
          day2WeatherDesc: getForecastData.list[3].weather[0].description,
          day2WeatherIcon: getForecastData.list[3].weather[0].icon,
          // DAY 3
          day3Date: getForecastData.list[11].dt_txt,
          day3Temp: getForecastData.list[11].main.temp,
          day3WeatherDesc: getForecastData.list[11].weather[0].description,
          day3WeatherIcon: getForecastData.list[11].weather[0].icon,
          // DAY 4
          day4Date: getForecastData.list[19].dt_txt,
          day4Temp: getForecastData.list[19].main.temp,
          day4WeatherDesc: getForecastData.list[19].weather[0].description,
          day4WeatherIcon: getForecastData.list[19].weather[0].icon,
          // DAY 5
          day5Date: getForecastData.list[27].dt_txt,
          day5Temp: getForecastData.list[27].main.temp,
          day5WeatherDesc: getForecastData.list[27].weather[0].description,
          day5WeatherIcon: getForecastData.list[27].weather[0].icon,
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
    this.getForecastData();

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
      currentWeatherDesc,
      currentWeatherIcon,
      currentPage,
    } = this.state;

    const {
      day2Date,
      day2Temp,
      day2WeatherDesc,
      day2WeatherIcon,
      day3Date,
      day3Temp,
      day3WeatherDesc,
      day3WeatherIcon,
      day4Date,
      day4Temp,
      day4WeatherDesc,
      day4WeatherIcon,
      day5Date,
      day5Temp,
      day5WeatherDesc,
      day5WeatherIcon,
    } = this.state;

    // const weatherIconImg = `https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;

    // const renderWeatherInfo = currentCity ? (
    //   <div>
    //     <img src={weatherIconImg} alt="weather icon" />
    //     <p>Current City: {currentCity}</p>
    //     <p>Current Temperature: {currentTemp}</p>
    //     <p>Feels Like: {currentFeelsLike}</p>
    //     <p>Current Weather: {currentWeather}</p>
    //   </div>
    // ) : (
    //   <p>Enter a city to check weather 🌤🌧☃️</p>
    // );

    const renderWeatherInfo = currentCity ? (
      <div>
        <p className="current-city">Current City: {currentCity}</p>
        <button
          className="forecast-button"
          onClick={() => this.handlePage("forecast")}
        >
          5-Day Weather Forecast
        </button>
        <CurrWeather
          currentWeatherIcon={currentWeatherIcon}
          currentTemp={currentTemp}
          currentFeelsLike={currentFeelsLike}
          currentWeatherDesc={currentWeatherDesc}
        />
      </div>
    ) : (
      <p>Enter a city to check weather 🌤🌧☃️</p>
    );

    let pageNavigation;
    if (currentPage === "forecast") {
      pageNavigation = (
        <ForecastWeather
          day2Date={day2Date}
          day2Temp={day2Temp}
          day2WeatherDesc={day2WeatherDesc}
          day2WeatherIcon={day2WeatherIcon}
          day3Date={day3Date}
          day3Temp={day3Temp}
          day3WeatherDesc={day3WeatherDesc}
          day3WeatherIcon={day3WeatherIcon}
          day4Date={day4Date}
          day4Temp={day4Temp}
          day4WeatherDesc={day4WeatherDesc}
          day4WeatherIcon={day4WeatherIcon}
          day5Date={day5Date}
          day5Temp={day5Temp}
          day5WeatherDesc={day5WeatherDesc}
          day5WeatherIcon={day5WeatherIcon}
          handlePage={this.handlePage}
        />
      );
    } else {
      pageNavigation = (
        <div className="home-page">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1rNWE1c29mOHN6bjl4cTdwMnc2b214dnZ4cXozdTlpNzhtMDQ4NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fXt5Bh0RIHuJsVfgX0/giphy.gif"
            alt="gif"
            className="img-header"
          />
          <br />
          <form>
            <input
              type="text"
              placeholder="Name of City"
              onChange={this.handleInputChange}
              value={this.inputCityValue}
              required
            />
            <button variant="contained" onClick={this.handleSubmit}>
              Check Weather
            </button>
          </form>
          {renderWeatherInfo}
        </div>
      );
    }

    return (
      <div className="App">
        <header
          className="App-header"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          {pageNavigation}
          {/* <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1rNWE1c29mOHN6bjl4cTdwMnc2b214dnZ4cXozdTlpNzhtMDQ4NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fXt5Bh0RIHuJsVfgX0/giphy.gif"
            alt="gif"
            width="200px"
          />
          <br />
          <form>
            <input
              type="text"
              placeholder="Name of City"
              onChange={this.handleInputChange}
              value={this.inputCityValue}
              required
            />
            <button variant="contained" onClick={this.handleSubmit}>
              Check Weather
            </button>
          </form>
          {renderWeatherInfo} */}
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

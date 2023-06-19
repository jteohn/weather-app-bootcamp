import React from "react";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class ForecastWeather extends React.Component {
  render() {
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
    } = this.props;

    const day2IconImg = `https://openweathermap.org/img/wn/${day2WeatherIcon}@2x.png`;

    const day3IconImg = `https://openweathermap.org/img/wn/${day3WeatherIcon}@2x.png`;

    const day4IconImg = `https://openweathermap.org/img/wn/${day4WeatherIcon}@2x.png`;

    const day5IconImg = `https://openweathermap.org/img/wn/${day5WeatherIcon}@2x.png`;

    const convertDay2Date = moment(day2Date).format("ll");
    const convertDay3Date = moment(day3Date).format("ll");
    const convertDay4Date = moment(day4Date).format("ll");
    const convertDay5Date = moment(day5Date).format("ll");

    return (
      <div className="forecast-page">
        <TableContainer
          component={Paper}
          style={{ opacity: "0.7", backgroundColor: "black" }}
        >
          <Table sx={{ maxWidth: 280 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                {/* FIRST ROW - HEADER */}
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Temperature
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  Weather
                </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            {/* SECOND ROW */}
            <TableBody>
              <TableCell align="center" style={{ color: "white" }}>
                {convertDay2Date}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day2Temp}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day2WeatherDesc}
              </TableCell>
              <TableCell>
                <img src={day2IconImg} alt="weather icon" width="80px" />
              </TableCell>
            </TableBody>
            {/* THIRD ROW */}
            <TableBody>
              <TableCell align="center" style={{ color: "white" }}>
                {convertDay3Date}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day3Temp}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day3WeatherDesc}
              </TableCell>
              <TableCell>
                <img src={day3IconImg} alt="weather icon" width="80px" />
              </TableCell>
            </TableBody>
            {/* FOURTH ROW */}
            <TableBody>
              <TableCell align="center" style={{ color: "white" }}>
                {convertDay4Date}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day4Temp}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day4WeatherDesc}
              </TableCell>
              <TableCell>
                <img src={day4IconImg} alt="weather icon" width="80px" />
              </TableCell>
            </TableBody>
            {/* FIFTH ROW */}
            <TableBody>
              <TableCell align="center" style={{ color: "white" }}>
                {convertDay5Date}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day5Temp}
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                {day5WeatherDesc}
              </TableCell>
              <TableCell>
                <img src={day5IconImg} alt="weather icon" width="80px" />
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <button
          className="forecast-button"
          onClick={() => this.props.handlePage("home")}
        >
          Back to Home
        </button>
      </div>
    );
  }
}

export default ForecastWeather;

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class CurrWeather extends React.Component {
  render() {
    const {
      currentTemp,
      currentFeelsLike,
      currentWeatherDesc,
      currentWeatherIcon,
    } = this.props;

    const weatherIconImg = `https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;

    return (
      <div>
        <img src={weatherIconImg} alt="weather icon" />
        <TableContainer component={Paper} style={{ opacity: "0.85" }}>
          <Table sx={{ maxWidth: 320 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                {/* FIRST ROW - TITLE */}
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Current Temperature
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Feels Like
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Current Weather
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              <TableCell align="center">{currentTemp}°C</TableCell>
              <TableCell align="center">{currentFeelsLike}°C</TableCell>
              <TableCell align="center">{currentWeatherDesc}</TableCell>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <p>Current City: {currentCity}</p>
        <p>Current Temperature: {currentTemp}</p>
        <p>Feels Like: {currentFeelsLike}</p>
        <p>Current Weather: {currentWeather}</p> */}
      </div>
    );
  }
}

export default CurrWeather;

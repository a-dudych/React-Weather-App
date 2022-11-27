import sunBg from "./assets/sun.jpg";
import snowBg from "./assets/snow.jpg";
import Details from "./components/Details";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("kyiv");
  const [bg, setBg] = useState(sunBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data);

      const max = units === "metric" ? 10 : 50;
      if (data.temp <= max) {
        setBg(snowBg)
      } else {
        setBg(sunBg)
      }
    }

    fetchWeatherData();

  }, [units, city]);

  const changeCity = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.target.blur();
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
      <div className="overlay">
        {
          weather && (
          <div className="container">
            <div className="section section__inputs">
              <input className="input" type="text" name="city" placeholder="Enter City..." onKeyUp={changeCity}/>
              <button className="button" onClick={() => {
                return units === "metric" ? setUnits("imperial") : setUnits("metric")
              }}>°{units === "metric" ? "F" : "C"}</button>
            </div>
            <div className="section section__temperature">
              <div className="info">
                <h3 className="info__city-name">{`${weather.name}, ${weather.country}`}</h3>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weatherIcon" />
                <h3 className="info__description">{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1 className="temperature__value">{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
              </div>
            </div>
            <Details weather={weather} units={units}/>
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;

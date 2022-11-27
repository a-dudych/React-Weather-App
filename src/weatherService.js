const API_KEY = "9dd19438bfe3d9bd4a857cca994f7669";

const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const response = await fetch(URL);
    const data = await response.json();

    const {weather, main: { temp, feels_like, temp_min, temp_max, pressure, humidity }, wind: { speed }, sys: { country }, name, } = data;

    const { description, icon } = weather[0];

    return {
        description, icon, temp, feels_like, temp_min, temp_max, pressure, humidity, speed, country, name, 
    }
}

export { getFormattedWeatherData }
import axios from "axios";

const getWeather = (lat, lng, api_key) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getWeather }
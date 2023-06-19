import { useState } from "react"
import { useEffect } from "react"
import weatherService from "../services/weatherService"

const Weather = ({ country, api_key }) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)


    useEffect(() => {
        weatherService.getWeather(country.latlng[0], country.latlng[1], api_key)
        .then(openWeather => {
                setWeather(openWeather)
                setIcon(`http://openweathermap.org/img/wn/${openWeather.weather[0].icon}@2x.png`)
            })
    }, [])

    if (!weather) return null

    return (
        <div>
            <h2>Weather in {country.name.common}</h2>
            <p>temperature {(weather.main.temp / 10).toFixed(2)} Celcius</p>
            <img src={icon}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )

}


export default Weather
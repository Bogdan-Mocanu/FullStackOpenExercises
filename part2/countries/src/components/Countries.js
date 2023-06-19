import Country from "./Country"
import Weather from "./Weather"

const Countries = ({ countryList, showButton, api_key }) => {

    if (!countryList) return <p>choose filter</p>

    if (countryList.length === 1) {
        return (
            <div>
                <Country country={countryList[0]} />
                <Weather country={countryList[0]} api_key={api_key} />
            </div>
        )
    }

    if (countryList.length <= 10) {
        return (
            <div>
                {countryList.map((country) => 
                    <p key={country.cca3}>{country.name.common} <button onClick={() => showButton(country)}>show</button> </p> 
                )}
            </div>
        )
    }

    return (
        <p>Too many matches, try another filter</p>
    )
}

export default Countries
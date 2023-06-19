
const Country = ({ country }) =>(
    <div>
        <h1>{country.name.common} {country.flag}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p>languages</p>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
    </div>
)


export default Country
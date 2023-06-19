import { useEffect, useState } from 'react';
import './App.css';
import Countries from './components/Countries';
import countryService from './services/countryService';


const App = () => {

  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState(null)
  const [countries, setCountries] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  const handleChange = (event) => setCountry(event.target.value)

  useEffect(() => {
    countryService.getAll()
      .then(allCountries => {
        setCountries(allCountries)
    })
  }, [])

  useEffect(() =>{
    if(country){
      setCountryList(() => {
        setCountryList(countries.filter(x => x.name.common.toLowerCase().includes(country.toLowerCase())))
      })
    }
  }, [country])

  const showButton = (val) => {
    setCountry(val.name.common)
  }



  return (
    <div>
        country: <input value={country} onChange={handleChange} />
        <Countries countryList={countryList} showButton={showButton} api_key={api_key} />
    </div>
  )
}


export default App;
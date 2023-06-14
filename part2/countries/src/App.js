import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Country from './components/Country';


const Countries = ({countryList}) => {

  if(!countryList) return null

  if (countryList.length === 1) {
    console.log(countryList[0])
    return (
      <p>{countryList[0].name.common}</p>
    )
  }

  if (countryList.length <= 10){
    return(
      <ul>
        {countryList.map((c) => <li key={c.cca3}>{c.name.common}</li>)}
      </ul>
    )
  }

  return (
    <p>Too many matches, try another filter</p>
  )
  
}


const App = () => {

  const [country, setCountry] = useState(null)
  const [value, setValue] = useState('')
  const [countryList, setCountryList] = useState(null)

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountry(event.target.value)
  }

  useEffect(() =>{
    if(country){
      setCountryList(() => {
        axios
          .get('https://studies.cs.helsinki.fi/restcountries/api/all')
          .then(response => {
            setCountryList(response.data.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase())))
          })
      })
    }
  }, [country])



  return (
    <div>
        country: <input value={value} onChange={handleChange} />
        <Countries countryList={countryList} />
    </div>
  )
}

export default App;

import './App.scss';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

// Components
import Header from './components/Header/Header'
import Cities from './components/Cities/Cities'

function App() {
  // Change between keys if you are out of calls 3FJowEm43ktAp9GJTr5WIhN0lAL9OoYH P4UgOanGsMHLIVSGWWHrrUoAb3VVz9Ag xVr8EQ21ytcGS8AJNEmEJCyj5djC9FJb
  const apiKey = 'xVr8EQ21ytcGS8AJNEmEJCyj5djC9FJb'

  // Setting states
  const [locationInput, setLocationInput] = useState([]);
  const [displayCity , setDisplayCity] = useState([]);
  useEffect(() => {
    getForecast()
    //eslint-disable-next-line
  },[locationInput])

  // selectedCityResponse starts with an empty array and gets populated with the response of the api plus a city name and a city key if there is any locationInput
  const getForecast = async () => {
    let selectedCityResponse = []
    if (locationInput.length) {
      for (let city of locationInput) {
        const {data} = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.value}?apikey=${apiKey}&metric=true`)
        selectedCityResponse.push({
          ...data,
          cityName: city.label,
          cityKey: city.value,
        })
      }
    }
    setDisplayCity(selectedCityResponse)
  }

  // Gets the input of React Select (AsyncSelect), map it and returns a value of city.key (to be used in getForecast call to the api) and a label (to be used as title of each city)
  const getLocations = async (inputValue) => {
    const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${inputValue}&language=en-us`)
    return data.map(city => {
      return {
        value: city.Key,
        label: `${city.LocalizedName} - ${city.Country.LocalizedName}`
      }
    })
  }

  // Sets the input of the React Select (AsyncSelect) to the state
  const handleInputChange = (newValue) => {
    setLocationInput(newValue)
  }

  // <AsyncSelect />: isMulti set to true so you can have multiples cities. loadOptions: populates the React Select with coincidences of the api response.
  // <Cities />:  Pass displayCity from state as props
  return (
    <div className="App">
      <Header />
      <AsyncSelect onChange={handleInputChange} isMulti loadOptions={getLocations} className="searchbox" />
      <Cities cities={displayCity}/>
    </div>
  );
}

export default App
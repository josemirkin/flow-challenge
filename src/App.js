import './App.scss';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// Components
import Header from './components/Header/Header'
import Cities from './components/Cities/Cities'

function App() {

  // Setting states
  const [locationInput, setLocationInput] = useState([]);
  const [displayCity, setDisplayCity] = useState([]);
  const [activeKey, setActiveKey] = useState('3FJowEm43ktAp9GJTr5WIhN0lAL9OoYH');
  useEffect(() => {
    getForecast()
    //eslint-disable-next-line
  }, [locationInput])

  // React select controllers
  const animatedComponents = makeAnimated()

  const apiKeyOptions = [
    { value: '3FJowEm43ktAp9GJTr5WIhN0lAL9OoYH', label: 'Key 1' },
    { value: 'P4UgOanGsMHLIVSGWWHrrUoAb3VVz9Ag', label: 'Key 2' },
    { value: 'xVr8EQ21ytcGS8AJNEmEJCyj5djC9FJb', label: 'Key 3' },
  ]

  // Sets new key value to the corresponding option choosen in the selector
  const setKey = (newKey) => {
    setActiveKey(newKey.value)
  }

  // selectedCityResponse starts with an empty array and gets populated with the response of the api plus a city name and a city key if there is any locationInput
  const getForecast = async () => {
    let selectedCityResponse = []
    if (locationInput.length) {
      for (let city of locationInput) {
        const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.value}?apikey=${activeKey}&metric=true`)
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
    const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${activeKey}&q=${inputValue}&language=en-us`)
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
      <div className='api-selector-container'>
        <p><b>If you are out of calls, please change to another api key</b></p>
        <Select options={apiKeyOptions} isSearchable={false} defaultValue={[apiKeyOptions[0]]} onChange={setKey} className='api-selector' />
      </div>
      <AsyncSelect onChange={handleInputChange} isMulti loadOptions={getLocations} components={animatedComponents} />
      <Cities cities={displayCity} />
    </div>
  );
}

export default App
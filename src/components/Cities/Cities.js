import React from 'react'
import './Cities.scss'

// Components
import City from '../City/City'

// Map props to be used in City.js as well as in Cities.js
function Cities({cities}) {
    return (
        <div className="cities">
            {cities.map(city =>  <City key={city.cityKey} city={city}/>)}
        </div>
    )
}

export default Cities
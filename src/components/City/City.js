import React from 'react'
import './City.scss'

// If there is a city (city?) and a DailyForecast (DailyForecast?), map it, if the index is greater than 0, return a div with the content. Index 0 is not used due to being used in the main display.
function City({ city }) {
    return (
        <div className="city">
            <div>
                <h4>{city.cityName}</h4>
                <div>
                    <h5>Today: {city?.DailyForecasts[0]?.Date}</h5>
                    <div>
                        <p>Min {city?.DailyForecasts[0]?.Temperature.Minimum.Value}</p>
                        <p>Max {city?.DailyForecasts[0]?.Temperature.Maximum.Value}</p>
                        <img src={`../Images/${city?.DailyForecasts[0]?.Day.Icon}.png`} alt={city?.DailyForecasts[0]?.Day.IconPhrase} />
                    </div>
                </div>
            </div>
            <div className="temperatures">
                {city?.DailyForecasts?.map((forecastDay, i) => {
                    if (i > 0) {
                        return (
                            <div key={i} className="test">
                                <img src={`../Images/${forecastDay.Day.Icon}.png`} alt={forecastDay.Day.IconPhrase} />
                                <p>{forecastDay.Day.IconPhrase}</p>
                                <p>{forecastDay.Date}</p>
                                <div>{forecastDay.Temperature.Minimum.Value} / {forecastDay.Temperature.Maximum.Value} {forecastDay.Temperature.Minimum.Unit}°</div>
                            </div>
                        )
                    } else return null
                })}
            </div>
        </div>
    )
}

export default City
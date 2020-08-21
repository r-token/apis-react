import React, {useState, useEffect} from 'react';


function App() {
  const [error, setError] = useState(null)
  const [weatherDataIsLoaded, setWeatherDataIsLoaded] = useState(false)
  const [weatherData, setWeatherData] = useState([])

  const apiKey = 'YourApiKey' // replace this with your API key from https://home.openweathermap.org/api_keys
  const cityName = 'Tulsa'

  // useEffect with an empty [] at the end runs once on page load.
  // put all the 'fetch' code in a button if you'd rather load data on button click
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`)
      .then(res => res.json())
      .then( 
        (result) => {
          setWeatherDataIsLoaded(true)
          setWeatherData(result)
        },
        (error) => {
          setWeatherDataIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;

  } else if (!weatherDataIsLoaded) {
      return <div>Loading...</div>;

  } else if ('main' in weatherData) {
      return <div>Current temperature in {cityName}: {weatherData.main.temp}° Fahrenheit</div>

  } else {
    return <div>Loading...</div>;
  }

}

export default App;

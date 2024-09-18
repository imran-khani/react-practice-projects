import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Home = () => {

    const [isLoading,setIsLoading] = useState(false);
    const [value,setValue] = useState('');
    const [weatherData,setWeatherData] = useState({})

    useEffect(()=>{
      const apiKey = process.env.API_KEY
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${value}&aqi=no`

      const getWeatherData = async ()=>{
        try {
          const data = await axios.get(url)

        } catch (error:any) {
          console.log(error)
        }
      }
    },[])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default form submission.
        // Add your form submission logic here
        setIsLoading(true);
        // Simulating an API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className="flex justify-center items-center p-8 py-24">
           <form 
            onSubmit={handleSubmit}
           className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <div className="mb-6">
              <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
                Search Weather
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="Enter city name"
                  className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-300 focus:outline-none focus:shadow-outline"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
              {value ? `Searching for: ${value}` : 'Enter a city name to get the latest weather information.'}
            </p>
           </form>
        </div>
    )
}

export default Home
import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface WeatherData {
  location?: {
    name: String;
    country: String;
    localtime:String;
  };
  current?: {
    temp_c: number;
    condition: {
      icon:string;
    }
  };
}

const Home = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [Error,setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${value}&aqi=no`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setWeatherData(data);
      setValue("");
    } catch (error:any) {
      console.log(error || "Error fetching data");
      setError(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-8 py-24">
      <form className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Search Weather
          </label>
          <div className="flex">
            <input
              type="text"
              id="search"
              onChange={handleChange}
              value={value}
              placeholder="Enter city name"
              className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              disabled={isLoading || value == ""}
              type="submit"
              onClick={(e) => submitHandler(e)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg transition-colors duration-300 focus:outline-none focus:shadow-outline disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <ClipLoader />
        ) : (
          <>
            <div className="flex flex-col gap-6">
              <div className="flex gap-x-2 justify-between">
                {weatherData.current && (
                  <>
                    <span>Country : {weatherData?.location?.country}</span>
                    <span>City : {weatherData?.location?.name}</span>
                  </>
                )}
              </div>
                <div className="flex gap-x-2 justify-between">
                  {weatherData.current && (
                    <>
                      <span>Temp : {weatherData?.current?.temp_c}</span>
                      <img 
                      src={weatherData.current.condition.icon}                      
                      alt="icon" />
                      {weatherData.location?.localtime}
                    </>
                  )}
                </div>
                {!weatherData.current || weatherData.location && (
                  <>
                  City not found..
                  </>
                )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Home;

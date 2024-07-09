import React, { useEffect, useState } from 'react'
import { addFavorite, currentWeather, deleteFavorite, getFavorites } from '../API/userApi'

const Weather = ({ city }) => {

  const [weatherData, setWeatherData] = useState();
  const [favorites, setFavorites] = useState();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await currentWeather(city);
      setWeatherData(res.data.weatherData);
    }
    fetchData();
  }, [city])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFavorites();
      setFavorites(res?.data?.favorites || []);

    }
    fetchData();

  }, [city, liked])

  useEffect(() => {
    if (weatherData && favorites.some(favorite => favorite.city === weatherData.city_name)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [weatherData, favorites, liked]);

  const favorite = async () => {
    const res = await addFavorite(weatherData?.city_name);
    if (res?.data?.success) {
      await fetchFavorites();
    }
  }

  const unlikeCity = async () => {
    const res = await deleteFavorite(weatherData?.city_name);
    if (res?.data?.success) {
      await fetchFavorites();
    }
  }
  const fetchFavorites = async () => {
    const res = await getFavorites();
    setFavorites(res?.data?.favorites || []);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime?.split(':')[0]);
    const day = date.getDate();
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    return `${day} ${weekday}`;
  }

  return (
    <div className="flex flex-col bg-[#27649e] rounded-lg w-full max-w-lg mx-auto">
      <p className="font-bold text-xl text-center pt-3">{weatherData?.city_name}</p>
      <p className="text-xs text-gray-800 text-center">Current weather</p>
      <p className="text-sm text-gray-800 text-center">{formatDate(weatherData?.datetime)}</p>
      <div className="mt-1 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-500 h-24 w-24">
        <svg
          className="w-32 h-32"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      </div>
      <div className="flex flex-row items-center justify-center mt-1">
        <h2 className="font-medium text-6xl">{weatherData?.temp}°</h2>
      </div>
      <div className="flex flex-row justify-between mt-6 px-3">
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-800 text-sm">Air Quality</h2>
          <p className="text-sm text-gray-400">{weatherData?.aqi}k/h</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-800 text-sm">Wind</h2>
          <p className="text-sm text-gray-400">{weatherData?.wind_spd}k/h</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-800 text-sm">Humidity</h2>
          <p className="text-sm text-gray-400">{weatherData?.rh}%</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-800 text-sm">Visibility</h2>
          <p className="text-sm text-gray-400">{weatherData?.vis}km</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-medium text-gray-800 text-sm">Pressure</h2>
          <p className="text-sm text-gray-400">{weatherData?.pres} hPa</p>
        </div>
        <div className="flex flex-col items-center pb-3">
          <h2 className="font-medium text-gray-800 text-sm">Dew Point</h2>
          <p className="text-sm text-gray-400">{weatherData?.dewpt}°C</p>
        </div>
      </div>
      {liked ?
        <p onClick={unlikeCity} className='bg-[#3770a5] text-sm text-gray-800 text-center py-2.5 cursor-pointer rounded-b-lg'>Remove from favorites</p>
        :
        <p onClick={favorite} className='bg-[#3770a5] text-sm text-gray-800 text-center py-2.5 cursor-pointer rounded-b-lg'>Add to favorites</p>
      }
    </div>
  )
}

export default Weather

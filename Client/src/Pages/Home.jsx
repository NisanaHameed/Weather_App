import React, { useEffect, useState } from 'react'
import Weather from '../Components/Weather'
import { forecast, getFavorites, historical } from '../API/userApi';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/Slice/AuthSlice';
import Modal from '../Components/Modal';

const Home = () => {

    const [city, setCity] = useState('London');
    const [searchCity, setSearchCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [history, setHistory] = useState([]);
    const [favorites, setFavorites] = useState();
    const [showFavorites, setShowFavorites] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await forecast(city);
            console.log(res)
            const data = []
            const weather = res?.data?.weatherData;
            for (let i = 0; i < 7; i++) {
                data.push(weather[i])
            }
            setWeatherData(data);
        }
        fetchData();
    }, [city])

    useEffect(() => {
        const fetchData = async () => {
            const res = await historical(city);
            console.log(res)
            const data = []
            const weather = res?.data?.weatherData;
            for (let i = 0; i < 7; i++) {
                data.push(weather[i])
            }
            setHistory(data);
            console.log(data)
        }
        fetchData()
    }, [city])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getFavorites();
            setFavorites(res?.data?.favorites || []);
            console.log(res)
        }
        fetchData();

    }, [])

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        const options = { weekday: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const getWeatherIcon = (description) => {
        const lowerDesc = description.toLowerCase();
        if (lowerDesc.includes('clear')) return '/clear.png';
        if (lowerDesc.includes('cloud')) return '/cloud.png';
        if (lowerDesc.includes('rain')) return '/rain.png';
        if (lowerDesc.includes('snow')) return '/snow.png';
        if (lowerDesc.includes('thunderstorm')) return '/thunderstorm.png';
        if (lowerDesc.includes('fog') || lowerDesc.includes('mist') || lowerDesc.includes('haze')) return '/fog.png';
        return '/clear.png';
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchCity.trim() !== '') {
            setCity(searchCity);
        }
    }

    const userLogout = async () => {
        dispatch(logout());
    }

    return (
        <div className='min-h-screen bg-cover bg-center p-5' style={{ backgroundImage: `url('/sky.jpg')` }}>
            <div className='flex justify-end mb-4'>
                <button type="button" onClick={() => setShowFavorites(!showFavorites)} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Favorites</button>
                <button type="button" onClick={userLogout} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
            </div>
            <div className="max-w-lg mx-auto mb-4">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-[#27649e] overflow-hidden">
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-400 pl-2 bg-[#27649e]"
                        placeholder="Search for location"
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                    <div className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer" onClick={handleSearch}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            < Weather city={city} />
            <div className='mt-4'>
                <h2 className='text-center'>7 day forecast</h2>
                <div className='flex items-center justify-center w-full mt-2 overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar'>
                    {weatherData.length && weatherData.map((val, index) => (
                        <div key={index} className='inline-block py-4 flex-shrink-0 w-32 h-48 mt-2 bg-[#27649e] hover:bg-[#205688] rounded-lg mr-3'>
                            <h2 className="text-gray-400 text-sm ml-3 mb-2">{formatDate(val?.datetime)}</h2>
                            <img className='w-14 mx-auto' src={getWeatherIcon(val?.weather?.description)} alt="" />
                            <h2 className="text-gray-800 text-center text-sm mt-2">{val?.temp}°</h2>
                            <h2 className="text-gray-400 text-wrap text-center text-sm mt-2 px-2">{val?.weather?.description}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='text-center'>7 day historical</h2>
                <div className='flex items-center justify-center w-full mt-2 overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar'>
                    {history.length && history?.map((val, index) => (
                        <div key={index} className='inline-block py-4 flex-shrink-0 w-32 h-48 mt-2 bg-[#27649e] hover:bg-[#205688]  rounded-lg mr-3'>
                            <h2 className="text-gray-400 text-sm ml-3 mb-2">{formatDate(val?.datetime)}</h2>
                            <h2 className="text-gray-800 text-center text-sm mt-2">{val?.temp}°</h2>
                            <h2 className="text-gray-500 text-wrap text-center text-sm mt-2 px-2">Humidity</h2>
                            <h2 className="text-gray-400 text-wrap text-center text-sm px-2">{val?.rh}%</h2>
                            <h2 className="text-gray-500 text-wrap text-center text-sm mt-2 px-2">Wind speed</h2>
                            <h2 className="text-gray-400 text-wrap text-center text-sm px-2">{val?.wind_spd} m/s</h2>
                        </div>
                    ))}
                </div>
            </div>
            {showFavorites && < Modal favorites={favorites} setShowFavorites={setShowFavorites} setCity={setCity} />}
        </div>
    )
}

export default Home


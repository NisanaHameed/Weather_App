import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

api.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('userToken'));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export const signup = async (data) => {
    try {
        const res = await api.post('/register', data);
        localStorage.setItem('userToken', res.data.token);
        return res;
    } catch (err) {
        return err;
    }
}

export const login = async (data) => {
    try {
        const res = await api.post('/login', data);
        localStorage.setItem('userToken', res.data.token);
        return res;
    } catch (err) {
        return err;
    }
}

export const currentWeather = async (city) => {
    try {
        const res = await api.get(`/weather/current?city=${city}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const forecast = async (city) => {
    try {
        const res = await api.get(`/weather/forecast?city=${city}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const historical = async (city) => {
    try {
        const res = await api.get(`/weather/historical?city=${city}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const addFavorite = async (city) => {
    try {
        const res = await api.post(`/favorites/${city}`);
        return res;
    } catch (err) {
        return err;
    }
}

export const getFavorites = async () => {
    try {
        const res = await api.get(`/favorites`);
        return res;
    } catch (err) {
        return err;
    }
}

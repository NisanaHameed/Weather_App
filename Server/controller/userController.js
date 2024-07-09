import axios from 'axios';
import prisma from '../config/prismaClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('data...', name, email, password);

    try {
        const findUser = await prisma.user.findUnique({ where: { email } });
        if (findUser) {
            return res.status(401).json({ success: false, message: 'User already exists!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
        console.log('user....', user)
        console.log('userid', user.id)
        const token = jwt.sign({ Id: user.id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        console.log(token);
        res.status(200).json({ success: true, token });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials!' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: 'Invalid credentials!' });
        }
        const token = jwt.sign({ Id: user.id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const currentWeather = async (req, res) => {
    try {
        const city = req.query.city;
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.WEATHER_BIT}`);
        const weatherData = response.data.data[0];
        res.status(200).json({ success: true, weatherData });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const forecast = async (req, res) => {
    try {
        const city = req.query.city;
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_BIT}`);
        const weatherData = response.data.data;
        res.status(200).json({ success: true, weatherData });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const historical = async (req, res) => {
console.log('hji')
    const city = req.query.city;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/history/subhourly?city=${city}&start_date=${start}&end_date=${end}&key=${process.env.WEATHER_BIT}`);
        console.log(response);
        const weatherData = response.data.data;
        console.log('weatherDataHistory',weatherData);
        res.status(200).json({ success: true, weatherData });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const addFavorite = async (req, res) => {
    const city = req.body.city;
    const userId = req.userId;
    try {
        const favorite = await prisma.favoriteCity.create({
            data: {
                city,
                userId
            }
        })
        res.status(200).json({ success: true });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const getFavorites = async (req, res) => {
    const userId = req.userId;
    try {
        const favorites = await prisma.favoriteCity.findMany({ where: { userId } });
        res.status(200).json({ success: true, favorites });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};
import express from 'express';
import { login, signup, currentWeather, forecast, historical, addFavorite, getFavorites } from '../controller/userController.js';
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/weather/current', currentWeather);
router.get('/weather/forecast', forecast);
router.get('/weather/historical', historical);
router.post('/favorites', addFavorite);
router.get('/favorites', getFavorites);

export default router;
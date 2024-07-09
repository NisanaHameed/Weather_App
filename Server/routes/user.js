import express from 'express';
import { login, signup, currentWeather, forecast, historical, addFavorite, unlikeCity, getFavorites } from '../controller/userController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/weather/current', authenticate, currentWeather);
router.get('/weather/forecast', authenticate, forecast);
router.get('/weather/historical', authenticate, historical);
router.post('/favorites/:city', authenticate, addFavorite);
router.delete('/favorites/:city', authenticate, unlikeCity);
router.get('/favorites', authenticate, getFavorites);

export default router;
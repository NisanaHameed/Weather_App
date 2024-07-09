import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/user.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on ${port}`));
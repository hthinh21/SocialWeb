import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import editprofileRoute from './routes/editprofileRoute.js'
import cors from 'cors'
import { loginUser, updateUserProfile } from './controllers/userControllers.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,// Cho phép gửi cookie
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome myPage")
})
app.use('/users',userRoute);
app.post('/login',loginUser);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log(`Connect to database!`);
    app.listen(PORT,() => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

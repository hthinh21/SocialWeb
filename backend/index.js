import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import editprofileRoute from './routes/editprofileRoute.js'
import cors from 'cors'
import { loginUser, updateUserProfile } from './controllers/userControllers.js';
import { checkToken } from './middlewares/authMiddleware.js';
const app = express();
// import cookieParser from 'cookie-parser';

// app.use(cookieParser());

app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', // Thay đổi nếu frontend không phải ở port này
   // Cho phép gửi cookie
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome myPage")
})
app.use('/users',userRoute);
app.use('/login',loginUser);
// app.use('/edit', editprofileRoute);
//
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:1324',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
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

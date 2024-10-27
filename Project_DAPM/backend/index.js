import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome myPage")
})
app.use('/users',userRoute);
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

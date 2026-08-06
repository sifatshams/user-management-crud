import cors from 'cors';
import express from 'express';
import userRoute from './routes/user.route.js';

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));

// api endpoint's
app.use('/api/v1/users', userRoute);

export default app;

import cors from 'cors';
import express from 'express';

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
);

// api endpoint's

export default app;

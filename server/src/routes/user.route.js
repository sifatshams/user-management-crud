import express from 'express';
import { getStats } from '../controllers/user.controller.js';

const userRoute = express.Router();

// routes
userRoute.get('/stats', getStats);

export default userRoute;

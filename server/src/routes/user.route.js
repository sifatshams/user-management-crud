import express from 'express';
import { getStats, searchUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

// routes
userRoute.get('/stats', getStats);
userRoute.get('/search/:query', searchUser);

export default userRoute;

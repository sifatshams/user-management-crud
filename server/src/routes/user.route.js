import express from 'express';
import {
  getStats,
  getUserById,
  searchUser,
} from '../controllers/user.controller.js';

const userRoute = express.Router();

// routes
userRoute.get('/stats', getStats);
userRoute.get('/search/:query', searchUser);
userRoute.get('/:id', getUserById);

export default userRoute;

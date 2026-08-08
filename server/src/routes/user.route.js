import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getStats,
  getUserById,
  searchUser,
  updateUser,
} from '../controllers/user.controller.js';

const userRoute = express.Router();

// routes
userRoute.get('/stats', getStats);
userRoute.get('/search/:query', searchUser);
userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.put('/:id', updateUser);
userRoute.delete('/:id', deleteUser);

export default userRoute;

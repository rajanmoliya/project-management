import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.use(protect);

router.get('/', getUsers);
router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

export default router;
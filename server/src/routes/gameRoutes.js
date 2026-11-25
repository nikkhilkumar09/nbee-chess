import express from 'express';
import { getUserGames, getGameById } from '../controllers/gameController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserGames);
router.get('/:id', authMiddleware, getGameById);

export default router;

import express from 'express';
import { signup, signin, signinWithGoogle, guestLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google-signin', signinWithGoogle);
router.post('/guest', guestLogin);

export default router;

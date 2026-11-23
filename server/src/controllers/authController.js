import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

// Generate a signed JWT for a user
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, isGuest: false },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

// 1. Signup
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    next(error);
  }
};

// 2. Signin
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    next(error);
  }
};

// 3. Google Signin (OAuth token handled client-side; we receive verified profile data)
export const signinWithGoogle = async (req, res, next) => {
  try {
    const { name, email, googleId, avatar } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ success: false, message: 'Google credentials required' });
    }

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = await User.create({ name: name || 'Google User', email, googleId, avatar: avatar || '' });
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (avatar && !user.avatar) user.avatar = avatar;
      await user.save();
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    next(error);
  }
};

// 4. Guest Login — ephemeral JWT, no DB entry
export const guestLogin = (req, res) => {
  const guestId = `guest_${Date.now()}`;
  const token = jwt.sign(
    { id: guestId, isGuest: true },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(200).json({
    success: true,
    token,
    user: { id: guestId, name: 'Guest', isGuest: true },
  });
};

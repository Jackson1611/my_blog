import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import createHttpError from 'http-errors';
import env from '../utils/validateEnv';

const signUp = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!username || !password) {
    throw createHttpError(400, 'Username and password are required');
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw createHttpError(409, 'Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.status(201).json({ message: 'User created successfully' });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw createHttpError(400, 'Username and password are required');
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw createHttpError(401, 'Invalid username or password');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Invalid username or password');
  }

  const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logout successful' });
};

export { signUp, login, logout };

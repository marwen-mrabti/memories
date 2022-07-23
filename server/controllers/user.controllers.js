import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//load user model
import { User } from '../models/user.model.js';

// user login
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'user des not exist ' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'invalid credentials' });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {
      expiresIn: '1h',
    });
    res.status(200).json({ userData: existingUser, token: token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// user register
export const UserRegister = async (req, res) => {
  // const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: 'passwords does not much' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: `${req.body.firstName} ${req.body.lastName}`,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', {
      expiresIn: '1h',
    });
    res.status(200).json({ newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `something went wrong => ${error.message}` });
  }
};

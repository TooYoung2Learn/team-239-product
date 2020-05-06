import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const createToken = (user) => {
  const {
    id, email, name, role
  } = user;
  const token = jwt.sign(
    {
      userId: id,
      email,
      name,
      role
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  return verified;
};

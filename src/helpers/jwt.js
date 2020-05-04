import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const createToken = (user) => {
  const {
    id, email, name
  } = user;
  const token = jwt.sign(
    {
      userId: id,
      email,
      name
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  return verified;
};

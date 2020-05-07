import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const createToken = ({
  id, email, name, role, communityId
}) => {
  const token = jwt.sign(
    {
      userId: id,
      email,
      name,
      role,
      communityId
    },
    process.env.JWT_SECRET
  );

  return token;
};

export const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  return verified;
};

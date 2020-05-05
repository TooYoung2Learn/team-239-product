/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';

export const hash = (password) => bcrypt.hashSync(password, 10);

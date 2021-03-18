import * as bcryptjs from 'bcryptjs';

export const generateHash = async (password: string) => {
  return bcryptjs.hash(password, 10);
};

export const compareHash = async (password: string, hash: string) => {
  return bcryptjs.compare(password, hash);
};

import * as dotenv from 'dotenv';
dotenv.config();

export const authConfiguration = {
  jwtSecret: process.env.JWT_SECRET || '',
};

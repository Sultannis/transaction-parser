import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authConfiguration } from 'src/common/configurations/auth.configuration';
import { UserTokenDto } from 'src/modules/auth/dto/user-token.dto';
import { AdminTokenDto } from '../dto/admin-token.dto';

@Injectable()
export class AuthService {
  comparePasswords(
    currentPasswordHash: string,
    comparingPassword: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(comparingPassword, currentPasswordHash, (err, success) => {
        if (err) return reject(err);
        return resolve(success);
      });
    });
  }

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  decodeToken(token: string): any {
    return jwt.verify(token, authConfiguration.jwtSecret);
  }

  generateUserAuthToken(payload: UserTokenDto): string {
    return jwt.sign(payload, authConfiguration.jwtSecret, { expiresIn: '7d' });
  }

  generateAdminAuthToken(payload: AdminTokenDto): string {
    return jwt.sign(payload, authConfiguration.jwtSecret, { expiresIn: '7d' });
  }
}

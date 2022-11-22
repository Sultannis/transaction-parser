import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/entities/user';
import { AuthService } from 'src/modules/auth/domain/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async register(
    payload: RegisterUserDto,
  ): Promise<[user: User, token: string]> {
    const existingUser = await this.usersRepository.findOneByEmail(
      payload.email,
    );
    if (existingUser) {
      throw new ConflictException('User with provided email already exist');
    }

    const { password, ...userPayload } = payload;
    const hashedPassword = await this.authService.hashPassword(password);

    const user = await this.usersRepository.insertAndFetch({
      ...userPayload,
      password: hashedPassword,
    });

    const token = this.authService.generateUserAuthToken({ id: user.id });

    return [user, token];
  }

  async login(payload: LoginUserDto): Promise<[user: User, token: string]> {
    const existingUser = await this.usersRepository.findOneByEmail(
      payload.email,
    );
    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      existingUser.password,
      payload.pasword,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Passwords does not match');
    }

    const token = this.authService.generateUserAuthToken({
      id: existingUser.id,
    });

    return [existingUser, token];
  }
}

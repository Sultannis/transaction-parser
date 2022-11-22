import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { AccessorRegisterUserDto } from './dtos/accessor-register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() payload: AccessorRegisterUserDto) {
    const [user, token] = await this.usersService.register(payload);

    return {
      user,
      auth: {
        token,
      },
    };
  }

  @Post('login')
  async login(@Body() payload: AccessorRegisterUserDto) {
    const [user, token] = await this.usersService.register(payload);

    return {
      user,
      auth: {
        token,
      },
    };
  }
}

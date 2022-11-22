import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/modules/users/data/users.repository';
import { UserResource } from 'src/modules/users/presenter/resources/user.resource';
import authConfig from 'src/common/configs/auth.config';

interface JwtPayload {
  id: number;
  stype: string;
  iat: number;
  exp: number;
}

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userResource: UserResource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<unknown> {
    try {
      const userDao = await this.usersRepository.findById(+payload.id);
      return this.userResource.convert(userDao);
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}

import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './domain/auth.service';
import { WsJwtStrategy } from './strategies/ws-jwt.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WsAuthGuard } from './guards/ws-auth.guard';
import authConfig from 'src/common/configs/auth.configuration';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConfig.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, WsJwtStrategy, WsAuthGuard, JwtStrategy],
  exports: [PassportModule, AuthService, WsJwtStrategy, WsAuthGuard],
})
export class AuthModule {}

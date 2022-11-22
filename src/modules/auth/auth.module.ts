import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './domain/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { authConfiguration } from 'src/common/configurations/auth.configuration';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConfiguration.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}

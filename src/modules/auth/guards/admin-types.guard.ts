import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../domain/auth.service';

@Injectable()
export class AdminTypesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedTypes = this.reflector.get<number[]>(
      'allowedTypes',
      context.getHandler(),
    );

    if (!allowedTypes?.length) {
      return false;
    }

    const token = context.switchToHttp().getRequest().headers.authorization;
    const formattedToken = token.substring(7);
    const decodedValue = this.authService.decodeToken(formattedToken);

    return allowedTypes.includes(decodedValue.type);
  }
}

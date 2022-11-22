import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserTypes } from 'src/common/constant/user-types';
import { AuthService } from '../domain/auth.service';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<number[]>(
      'allowedAdminRoles',
      context.getHandler(),
    );

    if (!allowedRoles) {
      return true;
    }

    const token = context.switchToHttp().getRequest().headers.authorization;
    const formattedToken = token.substring(7);
    const decodedValue = this.authService.decodeToken(formattedToken);

    if (decodedValue.type !== UserTypes.ADMIN) {
      return true;
    }

    return this.checkIfAdminRoleIncluded(allowedRoles, decodedValue.role);
  }

  private checkIfAdminRoleIncluded(roles: number[], adminRole: number) {
    return roles.includes(adminRole);
  }
}

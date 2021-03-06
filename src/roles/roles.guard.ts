import {
        CanActivate,
        ExecutionContext,
        HttpException,
        HttpStatus,
        Injectable,
        UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
        constructor(private jwtService: JwtService, private reflector: Reflector) {}

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
                const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                        context.getHandler(),
                        context.getClass(),
                ]);
                const req = context.switchToHttp().getRequest();

                if (!requiredRoles) return true;
                try {
                        const authHeader = req.headers.authorization;
                        const bearer = authHeader.split(' ')[0],
                                token = authHeader.split(' ')[1];

                        if (!token || bearer !== 'Bearer')
                                throw new UnauthorizedException({ message: 'Пользователь не авторизован' });

                        const user = this.jwtService.verify(token);
                        req.user = user;
                        return user.roles.some((role) => requiredRoles.includes(role.value));
                } catch (err) {
                        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
                }
        }
}

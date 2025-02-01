import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) ||
      this.reflector.get<string[]>('roles', context.getClass());

    if (!roles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se encontró un token en la cabecera de autorización.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Adjuntar usuario al request para que esté disponible en el controlador
      request['user'] = payload;

      // Validar si el rol del usuario está permitido
      if (!roles.includes(payload.role)) {
        throw new ForbiddenException('No tienes permiso para acceder a este recurso.');
      }

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado.');
      }
      throw new UnauthorizedException('Token no válido.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return undefined;
    }
    return authHeader.split(' ')[1];
  }
}

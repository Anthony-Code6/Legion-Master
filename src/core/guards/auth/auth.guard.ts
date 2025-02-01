import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se encontró un token en la cabecera de autorización.');
    }

    try {
      // Verifica y decodifica el token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Verifica si el token ha expirado
      // Tiempo actual en segundos
      const currentTime = Math.floor(Date.now() / 1000); 
      if (payload.exp && payload.exp < currentTime) {
        throw new UnauthorizedException('El token ha expirado.');
      }

      // Adjunta el payload al objeto de solicitud
      // Muestra los datos del usuario authentication
      request['user'] = payload;

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

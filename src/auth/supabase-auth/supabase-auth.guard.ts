import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];
    const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET');
    if(!jwtSecret) {
      throw new UnauthorizedException('Missing JWT secret in configuration');
    }
    try {
      const decode = jwt.verify(token, jwtSecret);
      request['user'] = decode;
      return true;
    } catch (error) {
      console.error('JWT verify failed:', error instanceof Error ? error.name : 'Unknown', '-', error instanceof Error ? error.message : String(error));
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

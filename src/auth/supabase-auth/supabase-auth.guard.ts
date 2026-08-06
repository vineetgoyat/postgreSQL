import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { jwtVerify, createRemoteJWKSet } from 'jose';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }
    const token = authHeader.split(' ')[1];

    const projectUrl = this.configService.get<string>('SUPABASE_URL'); // e.g. https://bjgwskjgloggdufmqitw.supabase.co
    const JWKS = createRemoteJWKSet(new URL(`${projectUrl}/auth/v1/.well-known/jwks.json`));

    try {
      const { payload } = await jwtVerify(token, JWKS);
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error('JWT verify failed:', error instanceof Error ? error.message : error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
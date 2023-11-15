import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, authService: AuthService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>(
          'AUTH0_DOMAIN',
        )}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    const minimumScope = ['read:transactions'];

    console.log('payload:', payload);
    console.log('payload2:', payload?.scope
    ?.split(' '));

    const arr = payload?.scope
    ?.split(' ');

    console.log('arr:', arr.map((item) => minimumScope.includes(item)));
    
    

    const hasScope = payload?.scope
      ?.split(' ')
      .filter((item) => minimumScope.includes(item));


      console.log('hasScope:', hasScope.length);
      

    if (hasScope.length === 0) {
      console.log('Entro');
      
      throw new UnauthorizedException('Insufficient scope');
    }

    return payload;
  }
}

// auth.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validateAccessToken(accessToken: string) {
    console.log('validateAccessToken');

    if (!accessToken) {
      throw new UnauthorizedException('Access token is invalid');
    }

    console.log('key:', this.configService.get<string>('AUTH0_DOMAIN'));

    try {
      const resp = await lastValueFrom(
        this.httpService
          .get(
            `https://dev-qpupby7k72aeyf55.us.auth0.com/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
              },
            },
          )
          .pipe(map((response) => response.data)),
      );

      console.log('resp:', resp);
      
    } catch (error) {
      throw new UnauthorizedException('Access token is invalid');
    }
  }

  validateProfile(profile: any) {
    if (!profile || !profile.name || !profile.email) {
      throw new UnauthorizedException('Profile is invalid');
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateAccessToken(accessToken: string) {
    try {
      const userDetailsByIdUrl = `http://localhost:3003/validate`;

      const resp = await fetch(userDetailsByIdUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await resp.json();

      if (data.statusCode !== 200) {
        throw new UnauthorizedException(data.statusText);
      }
    } catch (e: any) {
      if (UnauthorizedException) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}

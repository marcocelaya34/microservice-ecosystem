import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async validateAccessToken(accessToken: string) {
    try {
      console.log('entro a metodo');

      const userDetailsByIdUrl = `http://localhost:3003/validate`;

      console.log('accessToken:', accessToken);
      

      const resp = await fetch(userDetailsByIdUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await resp.json();

      console.log('metadataResponse:', data);

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

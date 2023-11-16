import { validate } from './utils/env.validation';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

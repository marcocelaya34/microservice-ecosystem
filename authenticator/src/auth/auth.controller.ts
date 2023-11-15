import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('/validate')
export class AuthController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  validate(@Res() res: Response) {
    res.status(200).json({ message: 'User authorized' });
  }
}

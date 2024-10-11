import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  signIn(@Body() payload: { username: string; password: string }) {
    return this.authService.signIn(payload.username, payload.password);
  }
}

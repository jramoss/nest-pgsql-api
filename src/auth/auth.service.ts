import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isMatch = await bcrypt.compare(password, String(user?.password))
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }else{
      const payload = { 
        sub: user?.id, 
        username: user?.username, 
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const isMatch = await bcrypt.compare(password, String(user?.password));
    const roles: any = [];
    user.roles.forEach((item) => {
      roles.push(item.name);
    });
    if (!isMatch) {
      throw new UnauthorizedException();
    } else {
      const payload: { sub: string; username: string; roles: string[] } = {
        sub: user?.id,
        username: user?.username,
        roles: roles,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ExecException } from 'child_process';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isMatch = await bcrypt.compare(password, String(user?.password))

    if (!isMatch) {
      throw new UnauthorizedException();
    }else{
      return user;
    }

  }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/database/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, AppService],
})
export class AuthModule {}

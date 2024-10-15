import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './database/prisma.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, AuthModule,PostModule, RoleModule],
  controllers: [AppController],
  providers: [ {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },AppService, PrismaService, UserService, PostService, AuthService],
})
export class AppModule {}

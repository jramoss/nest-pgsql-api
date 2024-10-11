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

@Module({
  imports: [UserModule, AuthModule,PostModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, PostService, AuthService],
})
export class AppModule {}

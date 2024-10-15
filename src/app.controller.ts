import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';
import { Post as PostModel, Role } from '@prisma/client';
import { Role as _role } from './auth/enums/função.enum';
import { Public } from './auth/decorators/auth.decorador';

@Controller('/')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly appService: AppService,
  ) {}
  @Get('/')
  async home() {
    return this.appService.getHello();
  }
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return await this.postService.findOne(id);
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.getPublishedPosts();
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() payload: { title: string; content: string; authorId: string },
  ) {
    return this.postService.create(payload);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.publishPost(id);
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.remove(id);
  }
  @Public()
  @Post('role')
  async role(
    @Body() payload: { name: string; description: string; userId: string },
  ): Promise<Role> {
    return this.appService.createRole(payload);
  }
}

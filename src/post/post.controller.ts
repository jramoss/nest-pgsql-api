import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePostIfaceDTo, PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(
    @Body() payload: { title: string; content: string; authorId: string },
  ) {
    return this.postService.create(payload);
  }

  @Get()
  findAll() {
    return this.postService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    payload: {
      title: string;
      content: string;
      published: boolean;
      authorId: string;
    },
  ) {
    return this.postService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Post } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

export interface CreatePostIfaceDTo {
  title: string;
  content: string;
  authorId: string;
}
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostIfaceDTo): Promise<Post> {
    try {
      return await this.prisma.post.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Titulo ja cadastrado tente outro titulo',
          );
        }
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException(`erro ${error.message}`, HttpStatus.OK);
      }
      throw new HttpException(`${error.code}`, HttpStatus.OK);
    }
  }

  async findOne(id: string) {
    const postExists = await this.prisma.post.findUnique({ where: { id } });
    if (!postExists) {
      throw new BadRequestException('Nehum registro nao encontrado');
    }
    return postExists;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        title: 'asc',
      },
    });
  }

  async update(
    id: string,
    payload: { title: string; content: string; published: boolean },
  ): Promise<Post> {
    const postExists = await this.prisma.post.findUnique({ where: { id } });
    if (!postExists) {
      throw new BadRequestException('Nenhum registro encontrado');
    }
    const postUpdated = await this.prisma.post.update({
      where: {
        id,
      },
      data: payload,
    });
    return postUpdated;
  }

  async remove(id: string) {
    const postExists = await this.prisma.post.findUnique({ where: { id } });
    if (!postExists) {
      throw new BadRequestException('Nenhum registro encontrado para esss id');
    }
    try {
      return this.prisma.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException('erro ao deleta post');
    }
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({ where, include: { author: true } });
  }

  async publishPost(id: string) {
    const postExists = await this.prisma.post.findUnique({ where: { id } });
    if (!postExists) {
      throw new BadRequestException('Nehum registro nao encontrado');
    }
    const NewPost = await this.prisma.post.update({
      where: { id },
      data: { published: true },
    });

    return NewPost;
  }

  async getPublishedPosts() {
    const PublishedPosts = await this.prisma.post.findMany({
      where: { published: true },
    });
    return PublishedPosts;
  }
}

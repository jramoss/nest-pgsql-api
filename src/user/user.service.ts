import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUserDto): Promise<User> {
    const { name, username, password } = payload;
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const userExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userExists) {
      throw new ConflictException('Usuario ja Cadastrado');
    }

    const user = this.prisma.user.create({
      data: {
        name,
        username,
        password: hashPassword,
        profile: {
          create: {bio: name}
        }
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const userExists = await this.prisma.user.findMany({
      include: { posts: true, roles: true, profile: true},
    });
    if (!userExists) {
      throw new BadRequestException(`nehum registro encontrado com id`);
    }
    return userExists;
  }

  async findOne(id: string): Promise<User> {
    const userExists = await this.prisma.user.findUnique({ where: { id },include:{profile:true,posts: true} });
    if (!userExists) {
      throw new BadRequestException(`nehum registro encontrado com id ${id}`);
    }
    return userExists;
  }

  async update(id: string, payload: UpdateUserDto ): Promise<User | undefined> {
    const { name, username, password } = payload;
    const salt = 10;
    const hashPassword = await bcrypt.hash(String(password), salt);
    const userExists   = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new BadRequestException(
        'Não Encontrado nenhum registro com esse id',
      );
    }

    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          username,
          password: hashPassword
        }
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Usuario ja cadastrado');
        }
      }
    }
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new BadRequestException('Nenhum registro encontrado')
    }
    await this.prisma.user.delete({where:{id}})
    throw new HttpException('Usuário deletado com successo',HttpStatus.NO_CONTENT)

  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },include:{roles: true},
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello() {
    return { message: 'Hello World!' };
  }
  async createRole(payload: {
    name: string;
    description: string;
    userId: string;
  }) {
    const { name, description, userId } = payload;
    return await this.prisma.role.create({
      data: { name, description, userId },
    });
  }
}

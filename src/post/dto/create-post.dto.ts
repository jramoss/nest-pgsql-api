import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty({
    example: crypto.randomUUID(),
    description: 'Identificado unico',
  })
  id?: string;
  title?: string;
  content: string;
  published?: boolean;
  author?: User;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

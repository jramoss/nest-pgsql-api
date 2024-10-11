import { User } from '@prisma/client';

export class Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: User;
  authorId: string;
}

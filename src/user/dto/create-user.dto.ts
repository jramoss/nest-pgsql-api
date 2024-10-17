import { ApiProperty } from '@nestjs/swagger';
import { Post, Profile } from '@prisma/client';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @ApiProperty({
    description: 'Informe nome completo',
    example: 'Maria Silva',
  })
  @IsNotEmpty({ message: 'Nome não pode ser vazionome nao pode ser vazio' })
  @MinLength(3, { message: 'name deve ter no minimo de 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Informe nome de usuario',
    example: 'Maria.s',
  })
  @IsNotEmpty({ message: 'Username não pode ser vazionome nao pode ser vazio' })
  @MinLength(3, { message: 'username deve ter no minimo de 3 caracteres' })
  username: string;

  @ApiProperty({
    description: 'Informe uma senha segura',
    example: '1234501@1234',
  })
  @MinLength(5, { message: 'username deve ter no minimo de 5 caracteres' })
  password: string;

  salt: string;
  status: boolean;
  confirmationToken: string;
  recoverToken: string;
  posts?: Post;
  profile?: Profile;
}

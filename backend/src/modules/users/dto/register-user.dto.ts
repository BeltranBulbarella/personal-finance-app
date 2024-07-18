import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Surname of the user' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Strong password for the user account',
  })
  @IsNotEmpty()
  password: string;
}

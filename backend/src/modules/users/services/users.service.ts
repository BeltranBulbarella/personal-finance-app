import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../dto/register-user.dto';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    };
  }

  async registerUser(dto: RegisterUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        password: hashedPassword,
      },
    });

    // Generate JWT token for the newly registered user
    const payload = { username: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    };
  }
}

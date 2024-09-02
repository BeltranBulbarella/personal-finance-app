import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const loginResult = await this.usersService.login(loginUserDto);
    res.cookie('auth_token', loginResult.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
    return res.json({
      success: true,
      access_token: loginResult.access_token,
      user: loginResult.user,
    });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const registerResult =
      await this.usersService.registerUser(registerUserDto);
    res.cookie('auth_token', registerResult.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
    return res.json({
      success: true,
      access_token: registerResult.access_token,
      user: registerResult.user,
    });
  }
}

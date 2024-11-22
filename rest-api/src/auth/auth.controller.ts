import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/auth/local.guard';
import { LoginDTO } from './dto/login.dto';
import { Public } from 'src/decorators/public/public.decorator';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/enums/roles';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from 'src/guards/auth/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('registration')
  async registration(@Body() user: AuthDTO) {
    return await this.authService.registration(user);
  }

  // @Public()
  // @Post('create-admin')
  // async createAdmin(@Body() user: AuthDTO) {
  //   return await this.authService.createAdmin(user);
  // }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('create-employee')
  async createEmployee(@Body() user: AuthDTO) {
    return await this.authService.createEmployee(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _user: LoginDTO,
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(req.user, response);
  }

  @Public()
  @ApiCookieAuth('refreshToken')
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refresh(req.user);
  }

  @Public()
  @ApiCookieAuth('refreshToken')
  @UseGuards(JwtRefreshAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.user);
  }

  @ApiBearerAuth()
  @Get('user')
  async getUser(@Request() req) {
    return req.user;
  }
}

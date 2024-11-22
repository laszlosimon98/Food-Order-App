import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createAdmin(user: AuthDTO) {
    return await this.userService.createAdmin(user);
  }

  async createEmployee(user: AuthDTO) {
    return await this.userService.createEmployee(user);
  }

  async registration(user: AuthDTO) {
    return await this.userService.create(user);
  }

  generateAccessToken(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${parseInt(
        this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION'),
      )}ms`,
    });

    return accessToken;
  }

  async generateRefreshToken(payload: any, response: Response) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${parseInt(
        this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'),
      )}ms`,
    });

    const expiresRefreshToken = new Date(
      new Date().getTime() +
        new Date(
          parseInt(
            this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION'),
          ),
        ).getTime(),
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: expiresRefreshToken,
    });

    await this.userService.updateRefreshToken(
      payload.sub,
      await bcrypt.hash(
        refreshToken,
        parseInt(this.configService.getOrThrow('HASHROUND')),
      ),
    );
  }

  async login(user: any, response: Response) {
    const payload = {
      sub: user.user_id,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
    };

    this.generateRefreshToken(payload, response);
    const accessToken = this.generateAccessToken(payload);

    return {
      access_token: accessToken,
    };
  }

  async refresh(user: any) {
    const payload = {
      sub: user.sub,
      full_name: user.full_name,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);

    return {
      access_token: accessToken,
    };
  }

  async logout(user: any) {
    await this.userService.updateRefreshToken(user.user_id, '');
    return true;
  }

  async validateUser(username: string, pwd: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pwd, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password, refreshToken, ...rest } = user;
    return rest;
  }

  async verifyUserRefreshToken(username: string, token: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid: boolean = await bcrypt.compare(
      token,
      user.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }

    const { password, refreshToken, ...rest } = user;
    return rest;
  }
}

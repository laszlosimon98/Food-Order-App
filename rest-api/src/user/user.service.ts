import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { Role } from 'src/enums/roles';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(user: AuthDTO, role: Role = Role.User) {
    const { username, password } = user;

    const isUserRegistered = await this.findOne(username);

    if (isUserRegistered) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(this.configService.getOrThrow('HASHROUND')),
    );

    const newUser = {
      ...user,
      password: hashedPassword,
      role: role,
    };

    await this.prisma.user.create({
      data: {
        ...newUser,
        refreshToken: '',
      },
    });

    return {
      success: true,
    };
  }

  async createAdmin(user: AuthDTO) {
    return await this.create(user, Role.Admin);
  }

  async createEmployee(user: AuthDTO) {
    return await this.create(user, Role.Employee);
  }

  async findOne(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        user_id: id,
      },
      data: { refreshToken },
    });
  }
}

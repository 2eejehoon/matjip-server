import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async updateUserByEmail(email: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({ where: { email }, data });
    }

    async getUserAndProfile(user: User) {
        const { password, refreshToken, ...userinfo } = user;
        const profile = await this.prisma.profile.findUnique({ where: { userId: user.id } });
        return { ...userinfo, profile };
    }

    async updateUserProfileByUserId({ userId, ...data }: UpdateUserDto) {
        return await this.prisma.profile.update({ where: { userId }, data });
    }
}

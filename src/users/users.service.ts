import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

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
        return { ...user, profile: await this.prisma.profile.findUnique({ where: { userId: user.id } }) };
    }
}

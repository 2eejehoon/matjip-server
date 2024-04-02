import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }
}

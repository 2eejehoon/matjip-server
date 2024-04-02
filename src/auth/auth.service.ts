import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GoogleLoginDto } from "./dtos/google-loign.dto";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private prisma: PrismaService
    ) {}

    async googleLogin(googleLoginDto: GoogleLoginDto): Promise<User> {
        const exisitngUser = await this.userService.findUserByEmail(
            googleLoginDto.email
        );
        if (exisitngUser) {
            return exisitngUser;
        }

        return this.userService.createUser(googleLoginDto);
    }
}

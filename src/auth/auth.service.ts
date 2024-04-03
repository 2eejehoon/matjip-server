import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AUTH_PROVIDERS_ENUM } from "src/contants/auth-providers";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async findOrCreateUser(user: User) {
        let existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser) {
            if (!existingUser.authProviders.includes(AUTH_PROVIDERS_ENUM.GOOGLE)) {
                existingUser.authProviders.push(AUTH_PROVIDERS_ENUM.GOOGLE);
                existingUser = await this.usersService.updateUserByEmail(user.email, existingUser);
            }
        } else {
            existingUser = await this.usersService.createUser(user);
        }

        const payload = { email: existingUser.email, sub: existingUser.id };
        return {
            ...existingUser,
            accessToken: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        };
    }
}

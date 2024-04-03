import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import { AUTH_PROVIDERS } from "src/contants/auth-providers";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async googleLogin(req: Request, res: Response, provider: AUTH_PROVIDERS) {
        const user = req.user as User;
        if (!user) {
            throw new NotFoundException("Not Found User");
        }

        const exisitngUser = await this.userService.findUserByEmail(user.email);
        if (exisitngUser) {
            if (!exisitngUser.authProviders.includes(provider)) {
                exisitngUser.authProviders.push(provider);
            }
            return res.redirect("http://localhost:3000/");
        }

        const createdUser = await this.userService.createUser(user);
        return res.redirect("http://localhost:3000/");
    }
}

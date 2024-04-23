import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth-guard";
import { Request } from "express";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getUserProfile(@Req() req: Request) {
        return await this.usersService.getUserAndProfile(req.user as User);
    }
}

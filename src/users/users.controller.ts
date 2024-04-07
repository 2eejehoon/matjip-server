import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth-guard";
import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getUserProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
        const userProfile = await this.usersService.findUserProfileById((req.user as User).id);
        res.status(HttpStatus.OK).json(userProfile);
    }
}

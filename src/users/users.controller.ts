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
        const userAndProfile = await this.usersService.getUserAndProfile(req.user as User);
        res.status(HttpStatus.OK).json(userAndProfile);
    }
}

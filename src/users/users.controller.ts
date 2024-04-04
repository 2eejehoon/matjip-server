import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth-guard";
import { Request, Response } from "express";

@Controller("users")
export class UsersController {
    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getUserProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
        res.status(HttpStatus.OK).json(req.user);
    }
}

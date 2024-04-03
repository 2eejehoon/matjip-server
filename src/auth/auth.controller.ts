import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/google-auth-guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleLogin(): Promise<void> {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req: Request, @Res() res: Response): Promise<void> {
        const user = await this.authService.findOrCreateUser(req.user as User);

        res.redirect(`${process.env.BASE_CLIENT_URL}/login?accessToken=${user.accessToken}`);
    }
}

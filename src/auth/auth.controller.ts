import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/GoogleAuthGuards";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { AUTH_PROVIDERS_ENUM } from "src/contants/auth-providers";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleLogin(): Promise<void> {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this.authService.googleLogin(req, res, AUTH_PROVIDERS_ENUM.GOOGLE);
    }
}

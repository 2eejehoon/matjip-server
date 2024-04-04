import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/google-auth-guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { User } from "@prisma/client";
import { SignupDto } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post("signup")
    @UsePipes(ValidationPipe)
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleLogin(): Promise<void> {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req: Request, @Res() res: Response): Promise<void> {
        const user = await this.authService.googleLogin(req.user as User);

        res.redirect(`${process.env.BASE_CLIENT_URL}/login/google-callback?accessToken=${user.accessToken}`);
    }
}

import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/google-auth-guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { LocalAuthGuard } from "./local/local-auth-guard";
import { GoogleUser } from "./type/googleUser";
import { JwtAuthGuard } from "./jwt/jwt-auth-guard";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

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
        const { accessToken } = await this.authService.googleLogin(req.user as GoogleUser);
        res.redirect(
            `${this.configService.get("BASE_CLIENT_URL")}/auth/login/google-callback?accessToken=${accessToken}`
        );
    }

    @Get("refreshToken")
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() req: Request) {
        return await this.authService.refreshToken(req.user as User);
    }
}

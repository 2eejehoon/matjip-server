import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/google-auth-guard";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { LocalAuthGuard } from "./local/local-auth-guard";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const user = await this.authService.login(loginDto);
        res.cookie("accessToken", user.accessToken, {
            maxAge: 60000,
            httpOnly: true,
            secure: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict"
        });
        res.status(HttpStatus.OK).json(user);
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
        const user = await this.authService.googleLogin(req.user as { email: string; name: string; photo: string });
        res.cookie("accessToken", user.accessToken, {
            maxAge: 60000,
            httpOnly: true,
            secure: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict"
        });
        res.redirect(
            `${this.configService.get("BASE_CLIENT_URL")}/auth/login/google-callback?accessToken=${user.accessToken}`
        );
    }

    @Get("kakao")
    async kakaoLogin() {}
}

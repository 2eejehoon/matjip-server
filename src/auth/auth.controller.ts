import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/GoogleAuthGuards";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleLogin(): Promise<void> {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(): Promise<void> {}
}

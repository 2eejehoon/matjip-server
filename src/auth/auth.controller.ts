import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/GoogleAuthGuards";

@Controller("auth")
export class AuthController {
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    googleLoginCallback() {}
}

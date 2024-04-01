import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/GoogleAuthGuards";

@Controller("auth")
export class AuthController {
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    onLogin() {
        return { msg: "Google Authentication" };
    }

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    onRedirect() {
        return { msg: "OK" };
    }
}

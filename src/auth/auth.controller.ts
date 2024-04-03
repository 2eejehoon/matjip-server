import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./google/GoogleAuthGuards";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
    constructor() {}
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleLogin(): Promise<void> {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    @Redirect(process.env.BASE_CLIENT_URL)
    async googleLoginCallback(@Req() req: Request, @Res() res: Response): Promise<void> {}
}

import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth-guard";
import { Request } from "express";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req: Request) {
        return await this.usersService.getProfile(req.user as User);
    }

    @Put("profile")
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateProfileByUserId(updateUserDto);
    }
}

import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./google/google-strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [AuthController],
    providers: [GoogleStrategy, AuthService, UsersService]
})
export class AuthModule {}

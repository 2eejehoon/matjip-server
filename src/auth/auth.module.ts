import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./google/google-strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: 60000 }
            })
        })
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, GoogleStrategy, AuthService, UsersService, JwtService]
})
export class AuthModule {}

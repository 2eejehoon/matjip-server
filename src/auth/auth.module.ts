import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./google/googleStrategy";

@Module({
    controllers: [AuthController],
    providers: [GoogleStrategy]
})
export class AuthModule {}

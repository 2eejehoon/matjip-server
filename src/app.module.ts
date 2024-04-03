import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { UsersModule } from "./users/users.module";
import { PostsService } from "./posts/posts.service";
import { PostsModule } from "./posts/posts.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PostsController } from "./posts/posts.controller";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        UsersModule,
        PostsModule,
        PrismaModule,
        AuthModule,
        PassportModule.register({ session: true }),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })
    ],
    controllers: [AppController, UsersController, PostsController, AuthController],
    providers: [AppService, UsersService, PostsService, PrismaService, AuthService, JwtService]
})
export class AppModule {}

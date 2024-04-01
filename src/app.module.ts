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

@Module({
    imports: [
        UsersModule,
        PostsModule,
        PrismaModule,
        AuthModule,
        ConfigModule.forRoot({ envFilePath: ".env" })
    ],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService, PostsService, PrismaService]
})
export class AppModule {}

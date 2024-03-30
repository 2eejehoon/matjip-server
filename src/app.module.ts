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

@Module({
    imports: [UsersModule, PostsModule, PrismaModule],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService, PostsService, PrismaService]
})
export class AppModule {}

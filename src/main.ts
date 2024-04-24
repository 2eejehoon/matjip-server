import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.use(cookieParser());

    // TODO: 로컬 환경에서 개발 끝나면 삭제
    app.enableCors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
    });

    app.use(
        session({
            secret: process.env.PASSPORT_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: {
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
            }
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    await app.listen(process.env.PORT);
}
bootstrap();

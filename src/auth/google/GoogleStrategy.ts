import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.AUTH_GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"]
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile
    ) {
        console.log({ accessToken, refreshToken, profile });
    }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get("AUTH_GOOGLE_CLIENT_ID"),
            clientSecret: configService.get("AUTH_GOOGLE_CLIENT_SECRET"),
            callbackURL: configService.get("AUTH_GOOGLE_CALLBACK_URL"),
            scope: ["profile", "email"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const { emails, displayName, photos } = profile;

        const user = {
            email: emails[0].value,
            name: displayName,
            photo: photos[0].value
        };

        done(null, user);
    }
}

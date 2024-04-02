import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
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
        profile: Profile,
        done: VerifyCallback
    ) {
        const { displayName, emails, photos } = profile;
        try {
            const user = await this.authService.googleLogin({
                email: emails[0].value,
                name: displayName,
                photo: photos[0].value
            });
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
}

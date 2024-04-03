import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AUTH_PROVIDERS_ENUM } from "src/contants/auth-providers";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.AUTH_GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const { emails, displayName, photos } = profile;

        const user = {
            email: emails[0].value,
            name: displayName,
            photo: photos[0].value,
            authProviders: [AUTH_PROVIDERS_ENUM.GOOGLE]
        };

        const exisitngUser = await this.userService.findUserByEmail(user.email);
        if (exisitngUser) {
            if (!exisitngUser.authProviders.includes(AUTH_PROVIDERS_ENUM.GOOGLE)) {
                const updatedUser = this.userService.updateUserByEmail(user.email, exisitngUser);
                done(null, updatedUser);
            }

            done(null, exisitngUser);
        } else {
            const createdUser = await this.userService.createUser(user);
            done(null, createdUser);
        }
    }
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AUTH_PROVIDERS_ENUM } from "src/contants/auth-providers";
import { UsersService } from "src/users/users.service";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signup({ passwordConfirm, ...user }: SignupDto) {
        if (user.password !== passwordConfirm) {
            throw new HttpException("비밀번호와 비빌번호 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        const existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser) {
            throw new HttpException("이미 존재하는 이메일 주소입니다.", HttpStatus.CONFLICT);
        }

        const data = {
            ...user,
            password: await bcrypt.hash(user.password, 10)
        };

        const createdUser = await this.usersService.createUser(data);

        const { password, ...userinfo } = createdUser;
        const payload = { email: userinfo.email, sub: userinfo.id };

        return {
            ...userinfo,
            accessToken: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        };
    }

    async googleLogin(user: User) {
        let existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser) {
            if (!existingUser.authProviders.includes(AUTH_PROVIDERS_ENUM.GOOGLE)) {
                existingUser.authProviders.push(AUTH_PROVIDERS_ENUM.GOOGLE);
                existingUser = await this.usersService.updateUserByEmail(user.email, existingUser);
            }
        } else {
            existingUser = await this.usersService.createUser(user);
        }

        const payload = { email: existingUser.email, sub: existingUser.id };
        return {
            ...existingUser,
            accessToken: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })
        };
    }
}

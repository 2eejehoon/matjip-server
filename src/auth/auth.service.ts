import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AUTH_PROVIDERS_ENUM } from "src/contants/auth-providers";
import { UsersService } from "src/users/users.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(loginDto: LoginDto) {
        const existingUser = await this.usersService.findUserByEmail(loginDto.email);
        if (!existingUser) {
            throw new NotFoundException("존재하지 않는 이메일입니다.");
        }

        const isMatch = await bcrypt.compare(loginDto.password, existingUser.password);
        if (!isMatch) {
            throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
        }

        const payload = { email: existingUser.email };
        const accessToken = this.jwtService.sign(payload, { secret: this.configService.get("JWT_SECRET") });
        const { password, ...userinfo } = existingUser;

        return {
            ...userinfo,
            accessToken
        };
    }

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

        const payload = { email: createdUser.email, sub: createdUser.id };
        const accessToken = this.jwtService.sign(payload, { secret: this.configService.get("JWT_SECRET") });
        const { password, ...userinfo } = createdUser;

        return {
            ...userinfo,
            accessToken
        };
    }

    async googleLogin(user: User) {
        let existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser) {
            if (!existingUser.authProviders.includes(AUTH_PROVIDERS_ENUM.GOOGLE)) {
                existingUser.authProviders.push(AUTH_PROVIDERS_ENUM.GOOGLE);
                existingUser = await this.usersService.updateUserByEmail(user.email, existingUser);
            }

            const payload = { email: existingUser.email, sub: existingUser.id };
            return {
                ...existingUser,
                accessToken: this.jwtService.sign(payload, { secret: this.configService.get("JWT_SECRET") })
            };
        }

        const createdUser = await this.usersService.createUser(user);
        const payload = { email: createdUser.email, sub: createdUser.id };
        return {
            ...existingUser,
            accessToken: this.jwtService.sign(payload, { secret: this.configService.get("JWT_SECRET") })
        };
    }
}

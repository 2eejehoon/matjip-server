import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignupDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    passwordConfirm: string;
}

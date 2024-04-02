import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    photo: string;
}

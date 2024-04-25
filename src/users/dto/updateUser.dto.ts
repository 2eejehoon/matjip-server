import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    photo: string;
}

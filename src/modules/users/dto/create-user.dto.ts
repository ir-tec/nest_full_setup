import { IsEmail, IsString, MinLength, } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email!: string
    @IsString()
    @MinLength(2)
    name!: string
}
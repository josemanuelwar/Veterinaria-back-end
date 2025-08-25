import { IsEmail, IsString } from "class-validator";

export class LoginDTO {

    @IsString()
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

}
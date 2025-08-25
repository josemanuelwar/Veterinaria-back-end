
import { IsEmail, IsString, IsInt} from "class-validator";

export class CreatedUserDTO{
    
    @IsString()
    @IsEmail()
    public email!:string;

    @IsString()
    public name!: string;

    @IsString()
    public rol!:string

}
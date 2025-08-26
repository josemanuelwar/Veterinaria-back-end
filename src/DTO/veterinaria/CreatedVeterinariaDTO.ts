import { IsString, IsEmail} from "class-validator";

export class CreatedVeterinariaDTO{
  @IsString()
  public nombre?:string;
  @IsString()
  public direccion?:string;
  @IsString()
  public telefono?:string;
  @IsEmail()
  public email?:string;
}


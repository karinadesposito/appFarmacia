import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFarmaciaDto {
  
  @IsNotEmpty() 
  @MaxLength(30) 
  name: string;

  @IsNotEmpty() 
  @IsEmail() 
  @MaxLength(50)
  mail: string;

  @IsNotEmpty() 
  @MaxLength(50) 
  domicilio: string;

}


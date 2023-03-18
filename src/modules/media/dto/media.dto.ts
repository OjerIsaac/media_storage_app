import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MediaStatus } from '../entities'; 

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsIn(['Active', 'Inactive'])
  @IsNotEmpty()
  status: MediaStatus;
}

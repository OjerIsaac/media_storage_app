import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { MediaStatus } from '../entities';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['Active', 'Inactive'])
  @IsNotEmpty()
  status: MediaStatus;
}
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { MediaStatus } from '../entities';

export class UpdateMediaDto {
  @IsIn(['Active', 'Inactive'])
  @IsNotEmpty()
  status: MediaStatus;
}
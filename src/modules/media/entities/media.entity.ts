import { Column, Entity } from 'typeorm';
import { BaseTable } from '../../../base';

export enum MediaStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

@Entity({ name: 'media' })
export class Media extends BaseTable {
  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({
    type: 'enum',
    enum: MediaStatus,
    default: MediaStatus.Active,
    nullable: false,
  })
  status: MediaStatus;
}

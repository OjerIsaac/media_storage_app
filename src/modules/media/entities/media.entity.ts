import { Column, Entity } from 'typeorm';
import { BaseTable } from '../../../base';

export enum MediaStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

@Entity({ name: 'media' })
export class MediaStorage extends BaseTable {

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'enum', nullable: false, default: 'Active' })
  status: MediaStatus;
}

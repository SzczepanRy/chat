import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;
}

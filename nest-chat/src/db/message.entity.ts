import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  content: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  date: number;

  @ManyToOne(() => Group, (group) => group.message)
  group: Group;
}

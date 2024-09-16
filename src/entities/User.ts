import 'reflect-metadata';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enums/userType';
import { Task } from './Task';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.USER,
  })
  usertype: UserType;
}

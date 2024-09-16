import 'reflect-metadata';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums/taskStatus';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date | null;
}

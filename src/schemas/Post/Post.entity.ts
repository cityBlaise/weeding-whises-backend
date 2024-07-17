import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Entity,
} from 'typeorm';
import { User } from '../User/User.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column({ nullable: false, type: 'longtext' })
  message: string;

  @Column({ nullable: false, type: 'varchar', length: 201 })
  author: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;
}

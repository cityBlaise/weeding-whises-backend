import { PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { Post } from '../Post/Post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false, unique: true})
  userName: string;

  @Column({ nullable: false,select:false })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.user, {
    eager: false,
  })
  posts: Post[];
}

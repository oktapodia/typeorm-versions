import {
  Column,
  Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { Category } from './Category';
import { VersionedBaseEntity, VersionedEntity } from '../../../../src';

@Entity()
@VersionedEntity()
export class PostToCategory extends VersionedBaseEntity {
  constructor() {
    super();

    this.active = true;
  }

  @PrimaryGeneratedColumn()
  public postToCategoryId!: number

  @Column()
  public active!: boolean;

  @ManyToOne(() => Post, post => post.postToCategories, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: "postId", referencedColumnName: "id" },
  ])
  public post!: Post;

  @ManyToOne(() => Category, category => category.postToCategories, { cascade: true })
  @JoinColumn([
    { name: "categoryId", referencedColumnName: "id" },
  ])
  public category!: Category;
}

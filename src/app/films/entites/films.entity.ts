import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenresEntity } from './genres.entity';

@Entity({ name: 'films' })
export class FilmsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'titles', nullable: false, unique: true })
  title: string;

  @Column({ name: 'release_year', nullable: false, type: 'integer' })
  releaseYear: number;

  @Column({ name: 'duration', nullable: false })
  duration: string;

  @Column({ name: 'sinopse', nullable: false, type: 'text' })
  sinopse: string;

  @ManyToMany(() => GenresEntity)
  @JoinTable()
  genres: Array<GenresEntity>;

  constructor(film?: Partial<FilmsEntity>) {
    this.id = film?.id;
    this.title = film?.title;
    this.releaseYear = film?.releaseYear;
    this.duration = film?.duration;
    this.sinopse = film?.sinopse;
    this.genres = film?.genres;
  }
}

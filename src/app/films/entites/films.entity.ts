import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'genre', nullable: false })
  genre: string;
}

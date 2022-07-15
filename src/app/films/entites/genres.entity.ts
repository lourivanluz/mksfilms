import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'genres' })
export class GenresEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'genre', nullable: false, unique: true })
  genre: string;

  constructor(genre?: Partial<GenresEntity>) {
    this.id = genre?.id;
    this.genre = genre?.genre;
  }
}

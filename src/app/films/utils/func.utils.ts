import { getRepository } from 'typeorm';
import { GenresEntity } from '../entites/genres.entity';

export const findOrCreateGenre = async (genreList: Array<string>) => {
  const genres = await Promise.all(
    genreList.map(async (genre) => {
      const genreRepo = getRepository(GenresEntity);
      const gen = await genreRepo.findOne({ genre: genre });
      if (!gen) {
        return await genreRepo.save(genreRepo.create({ genre: genre }));
      }
      return gen;
    }),
  );
  return genres;
};

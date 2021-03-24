import {Movie} from "./movie.entity";
import {EntityRepository, Repository} from "typeorm";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {User} from "../user/user.entity";
import * as fs from "fs";
import csv from "csv-parser"

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
    async getMovies(filterDto: GetMoviesFilterDto): Promise<Movie[]> {
        const { search /*, date */} = filterDto;
        const query = this.createQueryBuilder('movie')

        if (search) {
            query.andWhere(
                '(movie.title LIKE :search OR movie.genres LIKE :search)',
                { search: `%${search}%` }
                )
        }
        //
        // if (date) {
        //     const start = new Date(date)
        //     const end = new Date()
        //     query.andWhere(
        //         `movie.releaseDate BETWEEN :start AND :end`,
        //         { start, end }
        //         )
        // }

        const movies = await query.getMany()

        return movies
    }

    async createMovie(
        title: string,
        genres: string,
        // createMovieDto: CreateMovieDto,
    ): Promise<Movie> {
        // const { title, genres /*description, releaseDate*/ } = createMovieDto

        const movie = new Movie()
        movie.title = title
        movie.genres = genres
        await movie.save()

        return movie
    }

    async insertMovies(movies): Promise<void> {
        movies.list.forEach(movie =>
            this.createMovie(movie.title, movie.genres)
        )
    }

}

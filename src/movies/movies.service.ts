import {Get, Injectable, NotFoundException} from '@nestjs/common';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";
import {Movie} from "./movie.entity";
import {User} from "../user/user.entity";
import {CsvParser, ParsedData} from "nest-csv-parser";
import * as fs from "fs";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MovieRepository)
        private movieRepository: MovieRepository,
        private readonly csvParser: CsvParser
    ) {}

    async getMovies(filterDto: GetMoviesFilterDto): Promise<Movie[]> {
        return this.movieRepository.getMovies(filterDto)
    }
    async getMovieById(id: number): Promise<Movie> {
        const found = await this.movieRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Movie with ID "${id}" not found`)
        }

        return found
    }

    async createMovie(): Promise<void> {
        const stream = fs.createReadStream('./src/movies/data/movies.csv')
        const movies = await this.csvParser.parse(stream, Movie, null,null,{ strict: true, separator: ',' })
        await this.movieRepository.insertMovies(movies)
    }

    async deleteMovie(id: number): Promise<void> {
        const result = await this.movieRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Movie with ID "${id}" not found`)
        }
    }

    // addRating(id: string, rating: {}): MovieModel {
    //     const movie: MovieModel = this.getMovieById(id)
    //     // @ts-ignore
    //     movie.ratings.push(rating)
    //     return movie
    // }

    // getAllMovies(): MovieModel[] {
    //     return this.movies;
    // }
    //
    // getMoviesWithFilters(filterDto: GetMoviesFilterDto): MovieModel[] {
    //     const { search, date } = filterDto;
    //
    //     let movies: MovieModel[] = this.getAllMovies()
    //
    //     if (search) {
    //         movies = movies.filter(movie =>
    //             movie.title.includes(search) ||
    //             movie.description.includes(search)
    //         )
    //     }
    //
    //     if (date) {
    //         movies = movies.filter(movie => movie.releaseDate >= date);
    //     }
    //
    //     return movies
    // }
    //
}

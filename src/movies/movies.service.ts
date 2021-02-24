import {Get, Injectable, NotFoundException} from '@nestjs/common';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {MovieRepository} from "./movie.repository";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MovieRepository)
        private movieRepository: MovieRepository
    ) {
    }
    // private movies: MovieModel[] = [];
    //
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
    // getMovieById(id: string): MovieModel {
    //     const found =  this.movies.find(m => m.id === id);
    //
    //     if (!found) {
    //         throw new NotFoundException()
    //     }
    //
    //     return found
    // }
    //
    // createMovie(createMovieDto: CreateMovieDto): MovieModel {
    //     const { title, description, releaseDate } = createMovieDto;
    //     const movie: MovieModel = {
    //         id: uuid(),
    //         title,
    //         description,
    //         releaseDate,
    //         ratings: [],
    //     }
    //
    //     this.movies.push(movie);
    //     return movie;
    // }
    //
    // deleteMovie(id: string): void {
    //     const found = this.getMovieById(id)
    //     this.movies = this.movies.filter(m => m.id !== found.id)
    // }
    //
    // addRating(id: string, rating: {}): MovieModel {
    //     const movie: MovieModel = this.getMovieById(id)
    //     // @ts-ignore
    //     movie.ratings.push(rating)
    //     return movie
    // }
}

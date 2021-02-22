import {Get, Injectable} from '@nestjs/common';
import * as uuid from 'uuid';
import {CreateMovieDto} from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
    private movies: MovieModel[] = [];

    getAllMovies(): MovieModel[] {
        return this.movies;
    }

    getMovieById(id: string): MovieModel {
        return this.movies.find(m => m.id === id);
    }

    createMovie(createMovieDto: CreateMovieDto): MovieModel {
        const { title, description, releaseDate } = createMovieDto;
        const movie: MovieModel = {
            id: uuid(),
            title,
            description,
            releaseDate,
            ratings: [],
        }

        this.movies.push(movie);
        return movie;
    }

    deleteMovie(id: string): void {
        this.movies = this.movies.filter(m => m.id !== id)
    }
    //
    // addRating(id: string, rating: RatingModel): void {
    //     const movie = this.getMovieById()
    // }
}

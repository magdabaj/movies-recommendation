import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import {MovieRatingValidationPipe} from "./pipes/movie-rating-validation.pipe";

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    getMovies(@Query(ValidationPipe) filterDto: GetMoviesFilterDto): MovieModel[] {
        if (Object.keys(filterDto).length)
            return this.moviesService.getMoviesWithFilters(filterDto)
         else return this.moviesService.getAllMovies();
    }

    @Get('/:id')
    getMovieById(@Param('id') id: string): MovieModel {
        return this.moviesService.getMovieById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMovie(@Body() createMovieDto: CreateMovieDto): MovieModel {
        return this.moviesService.createMovie(createMovieDto)
    }

    @Delete('/:id')
    deleteMovie(@Param('id') id: string) {
        this.moviesService.deleteMovie(id);
    }

    @Patch(`/:id`)
    addRating(
        @Param('id') id: string,
        @Body('rating', MovieRatingValidationPipe) rating: object
    ): Movie {
        return this.moviesService.addRating(id,rating)
    }

}

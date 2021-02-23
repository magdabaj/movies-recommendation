import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    getMovies(@Query() filterDto: GetMoviesFilterDto): MovieModel[] {
        if (Object.keys(filterDto).length)
            return this.moviesService.getMoviesWithFilters(filterDto)
         else return this.moviesService.getAllMovies();
    }

    @Get('/:id')
    getMovieById(@Param('id') id: string): MovieModel {
        return this.moviesService.getMovieById(id);
    }

    @Post()
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
        @Body('rating') rating: object
    ): MovieModel {
        return this.moviesService.addRating(id,rating)
    }

}

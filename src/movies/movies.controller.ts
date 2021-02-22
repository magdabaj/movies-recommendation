import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {CreateMovieDto} from "./dto/create-movie.dto";

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    getAllMovies(): MovieModel[] {
        return this.moviesService.getAllMovies();
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

}

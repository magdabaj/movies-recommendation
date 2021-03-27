import {Movie} from "./movie.entity";
import {EntityRepository, Repository} from "typeorm";
import {CreateMovieDto} from "./dto/create-movie.dto";
import {GetMoviesFilterDto} from "./dto/get-movies-filter.dto";
import _ from "lodash";

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

    // async createMovie(
    //     createMovieDto: CreateMovieDto,
    // ): Promise<Movie> {
    //     const { title, genres } = createMovieDto
    //
    //     const movie = new Movie()
    //     movie.title = title
    //     movie.genres = genres
    //     await movie.save()
    //
    //     return movie
    // }

    async insertMovie(
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
        // let moviesList = []
        //
        // movies.forEach(movie =>
        //         moviesList.push({
        //             id: movie.id,
        //             title: movie.title,
        //             genres: movie.genres,
        //         })
        // )
        //
        // await (async () => {
        //     const desiredMovies = movies.length;
        //     const blockSize = 9000;
        //
        //     console.log(desiredMovies/blockSize)
        //
        //     for (const i of _.range(desiredMovies / blockSize)) {
        //         const movies = moviesList.slice(i*blockSize,i*blockSize+blockSize);
        //         await this.save(movies);
        //     }
        // })();
        let moviesList = []

        movies.forEach(movie => {
            moviesList.push({
                movieId: movie.id,
                title: movie.title,
                genres: movie.genres,
            })
            console.log(movie.id)
            if (moviesList.length === 9000) {
                console.log('moviesList', moviesList)
                this.save(moviesList)
                moviesList = []
                console.log("saved")
                console.log(movie.id)
            }
        })
        console.log('moviesList', moviesList)
        await this.save(moviesList)
        console.log("saved 2")
    }

}

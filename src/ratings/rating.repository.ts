import {EntityRepository, Repository} from "typeorm";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";
import {NotFoundException} from "@nestjs/common";

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        const { rating } = createRatingDto

        const ratingEntity = new Rating()
        ratingEntity.value = rating
        ratingEntity.timestamp = Date.now()
        ratingEntity.userId = user.id
        ratingEntity.user = user
        ratingEntity.movieId = movieId
        await ratingEntity.save()

        delete ratingEntity.user

        return ratingEntity
    }

    async getMovieRatings(movieId: number): Promise<Rating[]> {
        const query = this.createQueryBuilder('rating')

        if (movieId){
            query.andWhere('rating.movieId = :movieId', { movieId })
        } else {
            throw new NotFoundException(`Movie with id ${movieId} not found`)
        }

        const ratings = await query.getMany()

        return ratings
    }

    async getUserRatings(user: User): Promise<Rating[]> {
        const query = this.createQueryBuilder('rating')

        query.andWhere('rating.userId = :userId', { userId: user.id })

        const ratings = await query.getMany()

        return ratings
    }

    async insertRating(userId: number, movieId: number, rating: number, timestamp: number): Promise<void> {
        const ratingEntity = new Rating()
        ratingEntity.value = rating
        ratingEntity.userId = userId
        ratingEntity.movieId = movieId
        ratingEntity.timestamp = timestamp
        await ratingEntity.save()
    }

    async insertRatings(ratings): Promise<void> {
        let ratingsList = []
        ratings.forEach(rating => {
            ratingsList.push({
                userId: rating.userId,
                movieId: rating.movieId,
                value: rating.rating,
                timestamp: rating.timestamp,
            })
            if (ratingsList.length === 9000) {
                try {
                    this.save(ratingsList)
                } catch (e) {
                    console.log(e)
                }
                ratingsList = []
            }
        })
        try {
            await this.save(ratingsList)
        } catch (e)
        {
            console.log(e)
        }
    }
}
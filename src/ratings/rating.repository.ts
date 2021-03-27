import {Entity, EntityRepository, getConnection, Repository, Unique} from "typeorm";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";
import {options} from "tsconfig-paths/lib/options";

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        const { rating, timestamp } = createRatingDto

        const ratingEntity = new Rating()
        ratingEntity.value = rating
        ratingEntity.timestamp = timestamp
        ratingEntity.userId = user.id
        ratingEntity.user = user
        ratingEntity.movieId = movieId
        await ratingEntity.save()

        delete ratingEntity.user

        return ratingEntity
    }

    async insertRating(userId: number, movieId: number, rating: number, timestamp: string): Promise<void> {
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
            console.log(rating.movieId)
            if (ratingsList.length === 9000) {
                console.log('ratingsList', ratingsList)
                try {
                    this.save(ratingsList)
                } catch (e) {
                    console.log(e)
                }
                ratingsList = []
                console.log("saved")
            }
        })
        console.log(ratingsList)
        try {
            await this.save(ratingsList)
        } catch (e)
        {
            console.log(e)
        }
        console.log("saved 2")
    }
}
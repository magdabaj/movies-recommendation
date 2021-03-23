import {EntityRepository, Repository, Unique} from "typeorm";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {User} from "../user/user.entity";

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
    async createRating(
        createRatingDto: CreateRatingDto,
        movieId: number,
        user: User,
    ): Promise<Rating> {
        const { value } = createRatingDto

        const rating = new Rating()
        rating.value = value
        rating.userId = user.id
        rating.user = user
        rating.movieId = movieId
        await rating.save()

        delete rating.user

        return rating
    }

}
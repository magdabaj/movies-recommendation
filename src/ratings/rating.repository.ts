import {EntityRepository, Repository} from "typeorm";
import {Rating} from "./rating.entity";
import {CreateRatingDto} from "./dto/create-rating.dto";

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {
    async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
        const { value, movie, user } = createRatingDto

        const rating = new Rating()
        rating.value = value
        rating.user = user
        rating.movie = movie
        await rating.save()

        return rating
    }

}
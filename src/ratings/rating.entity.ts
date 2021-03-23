import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, Unique} from "typeorm";
import {MovieRatingEnum} from "./movie-rating.enum";
import {Movie} from "../movies/movie.entity";
import {User} from "../user/user.entity";

@Entity()
@Unique(["user", "movieId"])
export class Rating extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal")
    value: MovieRatingEnum;

    @Column("timestamp")
    createdAt: Timestamp

    @Column("number")
    userId: number;

    @ManyToOne(type => User, user => user.ratings, { eager: false })
    user: User

    @Column("number")
    movieId: number

    @ManyToOne(type => Movie, movie => movie.ratings, { eager: false })
    movie: Movie
}
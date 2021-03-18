import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Movie} from "../movies/movie.entity";

@Entity()
@Unique(["title"])
export class Genre extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => Movie, movie => movie.genres, { eager: false })
    movie: Movie
}
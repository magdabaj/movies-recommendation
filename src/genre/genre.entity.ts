import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "../movies/movie.entity";

@Entity()
export class Genre extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    //
    // @ManyToOne(type => Movie, movie => movie.genres, { eager: false })
    // movie: Movie
}
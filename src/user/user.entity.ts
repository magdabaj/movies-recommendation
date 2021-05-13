import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Rating} from "../ratings/rating.entity";

@Entity()
@Unique(["email", "username"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column("timestamp")
    createDate: Date

    @Column()
    salt: string

    @OneToMany(type => Rating, rating => rating.user, {eager: true})
    ratings: Rating[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}
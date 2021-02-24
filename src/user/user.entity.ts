import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Rating} from "../ratings/rating.entity";

@Entity()
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

    // async validatePassword(password: string): Promise<boolean> {
    //     const hash = await bcrypt.hash(password, this.salt)
    //     return hash === this.password
    // }
}
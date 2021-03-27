import * as bcrypt from 'bcrypt';
import {User} from "./user.entity";
import {EntityRepository, Repository} from "typeorm";
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {SigninCredentialsDto} from "./dto/signin-credentials.dto";
import {generateRandomString} from "../utils/generateRandomString";
import {getUniqueUsers} from "../utils/getUniqueValues";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userCredentialsDto: UserCredentialsDto) {

        const { username, email, password } = userCredentialsDto;

        const user = new User();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await UserRepository.hashPassword(password, user.salt);
        user.createDate = new Date();

        try {
            await user.save()
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException("Username already exists")
            } else {
                throw new InternalServerErrorException(e)
            }
        }
    }

    async validateUserPassword(signinCredentialsDto: SigninCredentialsDto): Promise<string> {
        const { email, password } = signinCredentialsDto;
        const user  = await this.findOne({ email })

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null
        }
    }

    private static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async createRandomUser(): Promise<void> {
        const user = new User();
        user.username = generateRandomString(10);
        user.email = user.username;
        user.salt = await bcrypt.genSalt();
        user.password = await UserRepository.hashPassword(generateRandomString(20), user.salt);
        user.createDate = new Date();

        try {
            await user.save()
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException("Username already exists")
            } else {
                throw new InternalServerErrorException(e)
            }
        }
    }

    async insertUsers(ratings): Promise<void> {
        const uniqueUsers = getUniqueUsers(ratings)
        uniqueUsers.forEach(() => this.createRandomUser())
    }
}
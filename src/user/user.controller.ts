import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {UserService} from "./user.service";
import {SigninCredentialsDto} from "./dto/signin-credentials.dto";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<void> {
        return this.userService.signUp(userCredentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInCredentialsDto: SigninCredentialsDto): Promise<{ accessToken: string}> {
        return this.userService.signIn(signInCredentialsDto)
    }

    @Post('/insert')
    insertUsers():Promise<void> {
        return this.userService.insertUsers()
    }
}

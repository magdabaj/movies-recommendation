import {BadRequestException, PipeTransform} from "@nestjs/common";

export class RatingValidationPipe implements PipeTransform {
    readonly allowedValues = [1, 2, 3, 4, 5]

    transform(value: any /* metadata: ArgumentMetadata*/): any {
        // metadata is an optional argument
        // console.log('metadata', metadata)
        value = value.toUpperCase();

        if (!this.isRatingValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid movie rating`)
        }

        return value;
    }

    private isRatingValid(rating: any) {
        const index = this.allowedValues.indexOf(rating)
        return index !== -1
    }

}
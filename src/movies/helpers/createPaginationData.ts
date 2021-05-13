import {GetMoviesFilterDto} from "../dto/get-movies-filter.dto";

export const createPaginationData = (filterDto: GetMoviesFilterDto): {page: number,limit: number,skippedItems:number} => {
    const page = filterDto.page ? Number(filterDto.page) : 1
    const paginationLimit = filterDto.limit ? Number(filterDto.limit) : 10
    const limit = paginationLimit > 10 ? 10 : paginationLimit
    const skippedItems = (page - 1) * limit

    return {page, limit, skippedItems}
}
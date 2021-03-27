export const getUniqueUsers = (parsedCsv): number[] => {
    let users = []
    parsedCsv.list.forEach(value => users.push(value.userId))
    return [...new Set(users)]
}
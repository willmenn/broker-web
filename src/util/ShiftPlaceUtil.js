export const sumDaysPlaces = function(days) {
    return Object.keys(days)
        .map(day => days[day])
        .reduce((prev, elem) => prev + elem, 0);
}

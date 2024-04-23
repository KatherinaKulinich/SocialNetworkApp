export const getUserAge = (year:number | null, month:number | null, day:number | null) => {
    if (year && month && day) {
        let today = new Date();
    
        let years = today.getFullYear() - year;
        let partOfYear = (today.getMonth() < month) || (today.getMonth() === month && today.getDate() < day) ? 1 : 0;
        let age = years - partOfYear;

        return age;
    }
    return null
}
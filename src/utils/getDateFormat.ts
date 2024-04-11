export const getDate = (date:number) => {
    const day = new Date(date).getDate()
    const month = new Intl.DateTimeFormat("en-US", {month: 'long'}).format(date)

    return `${day} ${month}`
}

export const getTime = (date:number) => {
    const min = new Date(date).getMinutes()
    const minFormat = min < 9 ? `0${min}` : min;

    const hours = new Date(date).getHours()
    const hoursFormat = hours < 9 ? `0${hours}` : hours;

    return `${hoursFormat}:${minFormat}`
}


import dayjs from "dayjs";


export const dateFormat = 'DD/MM/YYYY';




export const getFormFields = (user:any) => {
    const { userName, userSurname } = user?.personalData ?? {}
    const { userGender, userBirthday, userFamStatus, userCity, userCountry, userInterests, userAbout } = user?.profileData ?? {}

    

    

    const fields = [
        {
            name: ["userName"],
            value: userName || '',
        },
        {
            name: ["userSurname"],
            value: userSurname || '',
        },
        {
            name: ["userGender"],
            value: userGender || '',
        },
        {
            name: ["userBirthday"],
            value: userBirthday && dayjs(`${userBirthday.fullDate}`, dateFormat),
        },
        {
            name: ["userFamStatus"],
            value: userFamStatus || '',
        },
        {
            name: ["userCity"],
            value: userCity || '',
        },
        {
            name: ["userCountry"],
            value: userCountry || '',
        },
        {
            name: ["userInterests"],
            value: userInterests.length > 0 ? userInterests : ['Coding'],
        },
        {
            name: ["userAbout"],
            value: userAbout || '',
        },
    ]
    return fields
}
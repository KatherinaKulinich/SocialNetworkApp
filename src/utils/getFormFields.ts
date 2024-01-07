import dayjs from "dayjs";

const dateFormat = 'DD/MM/YYYY';




export const getFormFields = (user:any) => {
    const { userName, userSurname } = user.personalData
    const { userGender, userBirthday, userFamStatus, userCity, userCountry, userInterests, userAbout } = user.profileData


    const fields = [
        {
            name: ["userName"],
            value: userName ? userName : '',
        },
        {
            name: ["userSurname"],
            value: userSurname ? userSurname : '',
        },
        {
            name: ["userGender"],
            value: userGender ? userGender : '',
        },
        {
            name: ["userBirthday"],
            value: userBirthday && dayjs(`${userBirthday.fullDate}`, dateFormat),
        },
        {
            name: ["userFamStatus"],
            value: userFamStatus ? userFamStatus : '',
        },
        {
            name: ["userCity"],
            value: userCity ? userCity : '',
        },
        {
            name: ["userCountry"],
            value: userCountry ? userCountry : '',
        },
        {
            name: ["userInterests"],
            value: userInterests ? userInterests : ['Coding'],
        },
        {
            name: ["userAbout"],
            value: userAbout ? userAbout : '',
        },
    ]
    return fields
}
import dayjs from "dayjs";

const dateFormat = 'DD/MM/YYYY';




export const getFormFields = (user:any) => {
    const fields = [
        {
            name: ["userName"],
            value: user.userName ? user.userName : '',
        },
        {
            name: ["userSurname"],
            value: user.userSurname ? user.userSurname : '',
        },
        {
            name: ["userGender"],
            value: user.userGender ? user.userGender : '',
        },
        {
            name: ["userBirthday"],
            value: user.userBirthday && dayjs(`${user.userBirthday.fullDate}`, dateFormat),
        },
        {
            name: ["userFamStatus"],
            value: user.userFamStatus ? user.userFamStatus : '',
        },
        {
            name: ["userCity"],
            value: user.userCity ? user.userCity : '',
        },
        {
            name: ["userCountry"],
            value: user.userCountry ? user.userCountry : '',
        },
        {
            name: ["userInterests"],
            value: user.userInterests ? user.userInterests : ['Coding'],
        },
        {
            name: ["userAbout"],
            value: user.userAbout ? user.userAbout : '',
        },
    ]
    return fields
}
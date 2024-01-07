export const changePhotoSize = (url:string) => {
    if (url.includes('s96-c')) {
        let newUrl = url.replace('s96-c', 's400-c')
        return newUrl
    }
}
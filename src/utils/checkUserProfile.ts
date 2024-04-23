import { message } from "antd";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";



type SnapShotData = QueryDocumentSnapshot<DocumentData, DocumentData>

export const checkUserProfile = async (dataSnapShot:SnapShotData) => {
    const data = dataSnapShot.data()

    const surname = data?.personalData?.userSurname
    const name = data?.personalData?.userName
    const birthday = data?.profileData?.userBirthday

    if (surname !== '' && name !== '' && birthday !== undefined) {
        message.success(`Welcome to the app`)
        return true
    }
    message.info('It appears that the registration process was not completed correctly or was interrupted last time. Please fill out the required profile fields.', 8)
    return false
}
import { message } from "antd"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useCallback } from "react"
import { useAppSelector } from "../hooks"
import { UserProfile } from "types/UserProfile"



export const useEditProfile = () => {
    const userData:UserProfile  = useAppSelector(state => state.userData.user);
    const { userId } = userData.personalData ?? {}
    const userRef = doc(db, "users", userId);



    const updateUserProfile = useCallback(async (
        {userName, userSurname, userGender, userBirthday, userFamStatus, userCity, userCountry, userAbout, userInterests, userAvatar}:any) => {

        await message.loading('Updating profile...')

        console.log(userBirthday);
        
        const month = (userBirthday.$M <= 8 ? `0${userBirthday.$M + 1}` : (userBirthday.$M + 1))
        const day = (userBirthday.$D <= 9 ? `0${userBirthday.$D}` : userBirthday.$D) 
        
        const isAvatar = userAvatar?.fileList?.length || userAvatar !== undefined

        const location = `${userCountry && userCity ? `${userCountry}, ${userCity}` : `${userCountry} ${userCity}`}`


        if (userId) {         
            await updateDoc(userRef, {
                "personalData.userName": userName,
                "personalData.userSurname": userSurname,
                "personalData.userFullname": `${userName} ${userSurname}`,
                "profileData.userGender": userGender,
                "profileData.userBirthday":  {
                    fullDate: `${day}/${month}/${userBirthday.$y}`,
                    year: userBirthday.$y,
                    month: userBirthday.$M,
                    day: userBirthday.$D,
                },
                "profileData.userFamStatus": userFamStatus,
                "profileData.userCity": userCity,
                "profileData.userCountry": userCountry,
                "profileData.userLocation": location,
                "profileData.userInterests": userInterests,
                "profileData.userAbout": userAbout,
            })
            .then(async () => {
                if (isAvatar) {
                    const avatar = userAvatar.fileList[0]
                    const metadata = {
                        contentType: avatar.type,  
                    };
                    const imgRef = ref(storage, `users/${userId}/avatar/${userName}Avatar-${avatar.name}`); 
    
                    await uploadBytesResumable(imgRef, avatar.originFileObj as Blob, metadata)
                        .then(async()=> {
                            const downloadURL = await getDownloadURL(imgRef);

                            await updateDoc(userRef, {
                                "profileData.userAvatar": downloadURL,
                            });
                        })
                } 
            })
        }
    }, [userData])


    
    return {
        updateUserProfile
    }
}
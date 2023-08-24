import { message } from "antd"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useCallback } from "react"
import { getUserAge } from "utils/profileOptions"
import { useAppSelector } from "./hooks"
import { useNavigate } from "react-router-dom"

export const useEditProfile = () => {
    const userData = useAppSelector(state => state.userData.user);
    const navigate = useNavigate();



    const createUserProfile = useCallback(async (
        {userName, userSurname, userGender, userBirthday, userFamStatus, userCity, userCountry, userAbout, userInterests, userAvatar}:any) => {

        message.loading('Creating profile...')

        const month = (userBirthday.$M <= 9 ? `0${userBirthday.$M + 1}` : (userBirthday.$M + 1))
        const day = (userBirthday.$D <= 9 ? `0${userBirthday.$D}` : userBirthday.$D) 


        if (userData.userId) {
            const userRef = doc(db, "users", userData.userId);
            
            await updateDoc(userRef, {
                userName,
                userSurname,
                fullname: `${userName} ${userSurname}`,
                userGender,
                userBirthday:  {
                    fullDate: `${day}/${month}/${userBirthday.$y}`,
                    age: getUserAge(userBirthday.$y, userBirthday.$M, userBirthday.$D),
                    year: userBirthday.$y,
                    month: userBirthday.$M,
                    day: userBirthday.$D,
                },
                userFamStatus,
                userCity,
                userCountry,
                userInterests,
                userAbout,
                chatBackground: 'default'
            })
            .then(async () => {
                
                if (userAvatar.fileList.length) {

                    const avatar = userAvatar.fileList[0]
                    const metadata = {
                        contentType: avatar.type,  
                    };
                    const imgRef = ref(storage, `users/${userData.userId}/avatar/${userData.userName}Avatar-${avatar.name}`); 
    
                    await uploadBytesResumable(imgRef, avatar.originFileObj as Blob, metadata)
                        .then(async()=> {
    
                            const downloadURL = await getDownloadURL(imgRef);
                            await updateDoc(userRef, {
                                userAvatar: downloadURL,
                            });
                        })
                }
                await message.success('Created!')
                await navigate('/myProfile')
            })
        }
    }, [userData])


    
    return {
        createUserProfile
    }
}
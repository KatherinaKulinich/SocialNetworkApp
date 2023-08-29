import { message } from "antd"
import { db, storage } from "firebase"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useCallback } from "react"
import { getUserAge } from "utils/profileOptions"
import { useAppSelector } from "./hooks"
import { useNavigate } from "react-router-dom"
import { UserFullData } from "types/UserFullDataType"

export const useEditProfile = () => {
    const userData:UserFullData  = useAppSelector(state => state.userData.user);
    const navigate = useNavigate();
    const userRef = doc(db, "users", userData.userId);



    const createUserProfile = useCallback(async (
        {userName, userSurname, userGender, userBirthday, userFamStatus, userCity, userCountry, userAbout, userInterests, userAvatar}:any) => {

        await message.loading('Updating profile...')

        const month = (userBirthday.$M <= 9 ? `0${userBirthday.$M + 1}` : (userBirthday.$M + 1))
        const day = (userBirthday.$D <= 9 ? `0${userBirthday.$D}` : userBirthday.$D) 


        if (userData.userId) {
            // const userRef = doc(db, "users", userData.userId);
            
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
                userLocation: `${userCountry}, ${userCity}`,
                userInterests,
                userAbout,
                chatBackground: 'default',
                friends: [],
                photos: [],
            })
            .then(async () => {
                
                if (userAvatar?.fileList?.length || userAvatar !== undefined) {

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
                            await message.success('Created!')
                            await navigate('/myProfile')
                        })
                    return
                }
                await message.success('Created!')
                await navigate('/myProfile')
            })
        }
    }, [userData])


    const updateChatBackground = useCallback( async (bg: string) => {
        await message.loading('Updating chat background...');

        if (userData.userId) {
            await updateDoc(userRef, {
                chatBackground: bg,
            })
            await message.success('Created!')
        }
    }, [userData])


    
    return {
        createUserProfile,
        updateChatBackground
    }
}
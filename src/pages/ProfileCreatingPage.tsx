import image from '@images/creating.svg'
import { ProfileEditing } from "@components/ProfileEditing/ProfileEditing"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { useAuth } from 'hooks/authorization/useAuth'
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useEffect } from 'react'






export const ProfileCreatingPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserFullData(userId))
        }
    }, [])
    
    const myData = useAppSelector(state => state.userData.user)


    return (
        <Wrapper>
            <PageContainer>
                <PageImgTitle 
                    image={image} 
                    titleFirst="Profile"
                    titleSecond='Creating'
                />
                {Object.keys(myData).length === 6 && (
                    <ProfileEditing 
                        title="Please share some information for your profile" 
                        buttonText="Save and go to the app"
                        navigation='/myProfile'
                    />
                )}
            </PageContainer>
        </Wrapper>
    )
}
import { ProfileEditing } from "@components/ProfileEditing/ProfileEditing"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import image from '@images/creating.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchUserFullData } from "rdx/slices/userDataSlice"
import { useAuth } from "hooks/useAuth"



export const ProfileCreatingPage:React.FC = () => {
    const dispatch = useAppDispatch()
    const { userId } = useAuth()

    useEffect(() => {
        if (userId !== null && userId !== undefined ) {
            dispatch(fetchUserFullData(userId))
        }
    }, [dispatch, userId])


    return (
        <Wrapper>
            <PageContainer>
                <PageImgTitle 
                    image={image} 
                    titleFirst="Profile"
                    titleSecond='Creating'
                />
                <ProfileEditing 
                    title="Please share some information for your profile" 
                    buttonText="Save and go to the app"
                />
            </PageContainer>
        </Wrapper>
    )
}
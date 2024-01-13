import image from '@images/creating.svg'
import { ProfileEditing } from "@components/ProfileEditing/ProfileEditing"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"
import { useMyFullData } from 'hooks/useMyFullData'





export const ProfileCreatingPage:React.FC = () => {
    const userData = useMyFullData()


    return (
        <Wrapper>
            <PageContainer>
                <PageImgTitle 
                    image={image} 
                    titleFirst="Profile"
                    titleSecond='Creating'
                />
                {Object.keys(userData).length === 6 && (
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
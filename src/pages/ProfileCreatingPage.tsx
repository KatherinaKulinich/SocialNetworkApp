import { ProfileEditing } from "@components/ProfileEditing/ProfileEditing"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import image from '@images/creating.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { Wrapper } from "@components/layout/components/Wrapper/Wrapper"



export const ProfileCreatingPage:React.FC = () => {
    return (
        <Wrapper>
            <PageContainer>
                <PageImgTitle 
                    image={image} 
                    titleFirst="Profile"
                    titleSecond='Creating'
                />
                <ProfileEditing 
                    title="Please add some information for your profile" 
                    buttonText="Save and go to the app"
                />
            </PageContainer>
        </Wrapper>
    )
}
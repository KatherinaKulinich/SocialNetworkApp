import img from '@images/settingsPage.svg'
import { ChatBackground } from '@components/ChatBackgroundSettings/ChatBackground'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { ProfileEditing } from '@components/ProfileEditing/ProfileEditing'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'


export const SettingsPage:React.FC = () => {
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='Settings'
            />
            <ProfileEditing 
                buttonText='Save changes' 
                title='Profile editing'
            />
            <ChatBackground/>
        </PageContainer>
    )
}
import img from '@images/chats.svg'
import errorImg from '@images/nochats.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { ChatsContainer } from '@components/containers/ChatsContainer/ChatsContainer'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import { useAppSelector } from 'hooks/hooks'





export const MyChatsPage:React.FC = () => {
    const myData = useAppSelector(state => state.userData.user)
    const { chats } = myData

    
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='chats'
            />
            {chats.length > 0 ? (
                <ChatsContainer chatsData={chats}/>
            ) : (
                <ImageErrorMessage
                    image={errorImg} 
                    text="You don't have any chats"
                />
            )}
        </PageContainer>
    )
}
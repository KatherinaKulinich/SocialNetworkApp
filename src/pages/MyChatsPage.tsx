import img from '@images/chats.svg'
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { ChatsContainer } from '@components/containers/ChatsContainer/ChatsContainer'
import { useState } from 'react'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import errorImg from '@images/nochats.svg'

export const MyChatsPage:React.FC = () => {
    const [chats, setChats] = useState(['1'])
    
    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond='chats'
            />
            {chats.length > 0 ? (
                <ChatsContainer/>
            ) : (
                <ImageErrorMessage
                    image={errorImg} 
                    text="You don't have any chats"
                />
            )}
        </PageContainer>
    )
}
import { CommentCard } from "@components/cards/CommentCard/CommentCard";
import { ModalDefault } from "../ModalDefault/ModalDefault"
import { CommentsBox, Container, Photo, PhotoContent, Text } from "./ModalComments.styled";
import textPhoto from '@images/test/6.jpg';
import { MessageInput } from "@components/chat/components/MessageInput/MessageInput";


interface ModalCommentsProps {
    isModalOpen: boolean;
    onCloseModal: () => void;
}

export const ModalComments:React.FC<ModalCommentsProps> = ({isModalOpen, onCloseModal}) => {
    return (
        <ModalDefault 
            isModalOpen={isModalOpen} 
            onCloseModal={onCloseModal} 
            title="Comments"
        >
            <Container>
                <PhotoContent>
                    <Photo src={textPhoto}/>
                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem corporis quas eaque esse iure quia ducimus quaerat, sed alias vel accusantium dolor tempore necessitatibus repellendus nostrum facilis? Alias, ab blanditiis!
                    </Text>
                </PhotoContent>
                <CommentsBox>
                    <CommentCard 
                        userAvatar={textPhoto} 
                        userName="Anna Ivanova" 
                        commentText="beautiful!!!" 
                        commentDate="12.08.2023" 
                        commentTime="11:23"
                    />
                    <CommentCard 
                        userAvatar={textPhoto} 
                        userName="Anna Ivanova" 
                        commentText="beautiful!!!" 
                        commentDate="12.08.2023" 
                        commentTime="11:23"
                    />
                    <CommentCard 
                        userAvatar={textPhoto} 
                        userName="Anna Ivanova" 
                        commentText="beautiful!!!" 
                        commentDate="12.08.2023" 
                        commentTime="11:23"
                    />
                    <CommentCard 
                        userAvatar={textPhoto} 
                        userName="Anna Ivanova" 
                        commentText="beautiful!!!" 
                        commentDate="12.08.2023" 
                        commentTime="11:23"
                    />
                </CommentsBox>
                <MessageInput role="comment"/>
            </Container>
        </ModalDefault>
    )
}
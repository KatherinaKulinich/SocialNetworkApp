import { Avatar } from "@components/Avatar/Avatar"
import { Card, MainInfo, TextField, Name, Comment, Time, TimeField } from "./CommentCard.styled"
import { theme } from "@styles/Theme";


interface CommentCardProps {
    userAvatar: string;
    userName: string;
    commentText: string;
    commentDate: string;
    commentTime: string;
}

export const CommentCard:React.FC<CommentCardProps> = (
    {userAvatar, userName, commentText, commentDate, commentTime}) => {

        
    return (
        <Card>
            <MainInfo>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size={"30px"}
                />
                <TextField>
                    <Name>
                        {userName}
                    </Name>
                    <Comment>
                        {commentText}
                    </Comment>
                </TextField>
            </MainInfo>
            <TimeField>
                <Time>
                    {commentDate}
                </Time>
                <Time>
                    {commentTime}
                </Time>
            </TimeField>
        </Card>
    )
} 
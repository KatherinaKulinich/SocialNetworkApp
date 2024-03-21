import { useEffect, useRef } from "react";
import { Avatar } from "@components/Avatar/Avatar"
import { Card, MainInfo, TextField, Name, Comment, Time, TimeField } from "./CommentCard.styled"
import { theme } from "@styles/Theme";
import { CommentItem } from "types/Comment";


interface CommentCardProps {
    comment: CommentItem
}

export const CommentCard:React.FC<CommentCardProps> = ({comment}) => {
    const { userAvatar, userName, text, date } = comment;

    const getCommentDate = (date:number) => {
        return `${new Date(date).getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(date)}`
    }
    const getCommentTime = (date:number) => {
        return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
    }


    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref?.current) {
            ref.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [comment]);

        
    return (
        <Card ref={ref}>
            <MainInfo>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size={"25px"}
                />
                <TextField>
                    <Name>
                        {userName}
                    </Name>
                    <Comment>
                        {text}
                    </Comment>
                </TextField>
            </MainInfo>
            <TimeField>
                <Time>
                    {getCommentDate(date)}
                </Time>
                <Time>
                    {getCommentTime(date)}
                </Time>
            </TimeField>
        </Card>
    )
} 
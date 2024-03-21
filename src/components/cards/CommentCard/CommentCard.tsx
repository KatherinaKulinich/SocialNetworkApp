import { useEffect, useRef } from "react";
import { theme } from "@styles/Theme";
import { CommentItem } from "types/Comment";
import { Avatar } from "@components/Avatar/Avatar"
import { Card, MainInfo, TextField, Name, Comment, Time, TimeField } from "./CommentCard.styled"
import { getDate, getTime } from 'utils/getDateFormat'


interface CommentCardProps {
    comment: CommentItem
}

export const CommentCard:React.FC<CommentCardProps> = ({comment}) => {
    const { userAvatar, userName, text, date } = comment;



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
                    {getDate(date)}
                </Time>
                <Time>
                    {getTime(date)}
                </Time>
            </TimeField>
        </Card>
    )
} 
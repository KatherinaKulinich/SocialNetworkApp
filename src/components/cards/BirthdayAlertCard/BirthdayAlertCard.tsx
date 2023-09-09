import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "../../icons/Icon";
import { Age, BirthdayField, Card, DateField, Text, UserInfo, DateText } from "./BirthdayAlertCard.styled";
import { HiCake } from 'react-icons/Hi'
import { theme } from "@styles/Theme";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserFullData } from "types/UserFullDataType";
import { getSelectedUserData } from "rdx/slices/usersSlice";
import { useAppDispatch } from "hooks/hooks";


interface BirthdayAlertCardProps {
    // userAvatar: string;
    // userName: string;
    // userBirthDate: string;
    // futureAge: number
    user: UserFullData,
}


export const BirthdayAlertCard:React.FC<BirthdayAlertCardProps > = ({user}) => {

    const {fullname, userAvatar, userBirthday } = user;
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onGoToUserPage = useCallback(() => {
        navigate(`/myFriends/${fullname}/profile`)
        dispatch(getSelectedUserData(user))
    }, [dispatch])


    return (
        <Card onClick={onGoToUserPage}>
            <DateField>
                <Icon 
                    icon={<HiCake/>} 
                    iconSize="40px" 
                    iconColor="#FFF"
                />
                <BirthdayField>
                    <DateText>
                        {userBirthday.fullDate}
                    </DateText>
                    <Text>
                        will celebrate 
                        <Age>{userBirthday.age + 1}</Age>
                        y.o
                    </Text>
                </BirthdayField>
            </DateField>
            <UserInfo>
                <Text>
                    {fullname}
                </Text>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regularLight} 
                    size="40px"
                />
            </UserInfo>
        </Card>
    )
}
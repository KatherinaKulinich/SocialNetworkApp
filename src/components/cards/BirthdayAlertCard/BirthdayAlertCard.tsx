import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "@components/icons/Icon";
import { Age, BirthdayField, Card, DateField, Text, UserInfo, DateText } from "./BirthdayAlertCard.styled";
import { HiCake } from 'react-icons/Hi'
import { theme } from "@styles/Theme";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getSelectedUserData } from "rdx/slices/usersSlice";
import { useAppDispatch } from "hooks/hooks";
import { UserProfile } from "types/UserProfile";
import { getUserAge } from "utils/getUserAge";


interface BirthdayAlertCardProps {
    user: UserProfile,
}


export const BirthdayAlertCard:React.FC<BirthdayAlertCardProps > = ({user}) => {
    const { userFullname } = user.personalData;
    const { userAvatar, userBirthday } = user.profileData;
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    
    const goToUserPage = useCallback(() => {
        navigate(`/users/${userFullname}/profile`)
        dispatch(getSelectedUserData(user))
    }, [dispatch])
    
    const { year, month, day, fullDate } = userBirthday
    const age = getUserAge(year, month, day)
    const userAge = age !== null ? age + 1 : null


    return (
        <Card onClick={goToUserPage}>
            <DateField>
                <Icon 
                    icon={<HiCake/>} 
                    iconSize="25px" 
                    iconColor="#FFF"
                />
                <BirthdayField>
                    <DateText>
                        {fullDate}
                    </DateText>
                    {userAge && (
                        <Text>
                            will celebrate 
                            <Age>
                                {userAge}
                            </Age>
                            y.o
                        </Text>
                    )}
                </BirthdayField>
            </DateField>
            <UserInfo>
                <Text>
                    {userFullname}
                </Text>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regularLight} 
                    size="30px"
                />
            </UserInfo>
        </Card>
    )
}
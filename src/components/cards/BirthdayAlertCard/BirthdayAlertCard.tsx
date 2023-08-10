import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "../../icons/Icon";
import { Age, BirthdayField, Card, DateField, Text, UserInfo, DateText } from "./BirthdayAlertCard.styled";
import { HiCake } from 'react-icons/Hi'
import { theme } from "@styles/Theme";


interface BirthdayAlertCardProps {
    userAvatar: string;
    userName: string;
    userBirthDate: string;
}

export const BirthdayAlertCard:React.FC<BirthdayAlertCardProps > = (
    {userAvatar, userName, userBirthDate}) => {

    return (
        <Card>
            <DateField>
                <Icon 
                    icon={<HiCake/>} 
                    iconSize="40px" 
                    iconColor="#FFF"
                />
                <BirthdayField>
                    <DateText>
                        {userBirthDate}
                    </DateText>
                    <Text>
                        will celebrate 
                        <Age>25</Age>
                        y.o
                    </Text>
                </BirthdayField>
            </DateField>
            <UserInfo>
                <Text>
                    {userName}
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
import { CardContent, Flex, Text, UserAdditionalInfo, UserCard, UserInfo, UserName } from "./SearchUserCard.styled"
import { MdDoubleArrow, MdOutlinePermContactCalendar, MdLocationOn } from "react-icons/Md";
import { Icon } from "../../icons/Icon";
import { theme } from "@styles/Theme";
import { Avatar } from "@components/Avatar/Avatar";
import { UserProfile } from "types/UserProfile";
import { getUserAge } from "utils/getUserAge";
import { useNavigateToUserPage } from "hooks/contacts/useNavigateToUserPage";



interface SearchUserCardProps {
    user: UserProfile,
}



export const SearchUserCard:React.FC<SearchUserCardProps> = ({user}) => {
    const { goToUserPage } = useNavigateToUserPage(user)

    const { userFullname } = user?.personalData || {}
    const { userAvatar, userBirthday, userLocation, userInterests } = user?.profileData ?? {}

    const age = userBirthday?.year ? `${getUserAge(userBirthday?.year, userBirthday?.month, userBirthday?.day)} y.o.` : 'no info';


    
    return (
        <UserCard onClick={goToUserPage}>
            <CardContent>
                <Avatar 
                    photo={userAvatar} 
                    border={theme.colors.regular} 
                    size="40px"
                />
                <UserInfo>
                    <UserName>
                        {userFullname}
                    </UserName>
                    <UserAdditionalInfo>
                        
                        <Flex>
                            <Icon 
                                icon={<MdOutlinePermContactCalendar/>} 
                                iconSize="15px" 
                                iconColor={theme.colors.mediumGray}
                            /> 
                            <Text>
                                {age}
                            </Text>
                        </Flex>
                        <Flex>
                            <Icon 
                                icon={<MdLocationOn/>} 
                                iconSize="15px" 
                                iconColor={theme.colors.mediumGray}
                            /> 
                            <Text>
                                {userLocation || 'location not specified'}
                            </Text>
                        </Flex>
                        <Text>
                            {userInterests.join(', ')}
                        </Text>
                    </UserAdditionalInfo>
                </UserInfo>
            </CardContent>
            <Icon 
                icon={<MdDoubleArrow/>} 
                iconSize="50px" 
                iconColor={theme.colors.regular}
            /> 
            
        </UserCard>
    )
}
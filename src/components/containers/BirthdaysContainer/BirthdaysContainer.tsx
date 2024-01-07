import image from '@images/birthBalloons.svg'
import { Container } from "./BirthdaysContainer.styled"
import { BirthdayAlertCard } from "@components/cards/BirthdayAlertCard/BirthdayAlertCard";
import { ListContainer } from "../ListContainer/ListContainer";
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import { useUsersBirthdays } from "hooks/birthdays/useUsersBirthdays";
import { TwoTabsContainer } from "@components/tabs/TwoTabsContainer";
import { useCallback } from "react";
import { UserProfile } from 'types/UserProfile';


interface BirthdaysContainerProps {
    friendsData: UserProfile[]
}



export const BirthdaysContainer:React.FC<BirthdaysContainerProps> = ({friendsData}) => {
    const { usersThisMonth, usersNextMonth } = useUsersBirthdays(friendsData)


    const getBirthdayCards = useCallback((users:UserProfile[]):JSX.Element => {
        return (
                    <ListContainer>
                        {users.map(user => (
                            <BirthdayAlertCard 
                                user={user}
                                key={user.personalData.userId}
                            />
                        ))}
                    </ListContainer>
                )
    }, [])
  

    
    return (
        <Container>
            <TwoTabsContainer
                firstTabName="This month"
                secondTabName="Next month"
                firstTabContent={
                    usersThisMonth.length > 0 
                    ? 
                    getBirthdayCards(usersThisMonth)
                    : 
                    (
                        <ImageErrorMessage 
                            text='Nobody of your friends is celebrating a birthday this month' 
                            image={image}
                        />
                    )
                }
                secondTabContent={
                    usersNextMonth.length > 0 
                    ? 
                    getBirthdayCards(usersNextMonth)
                    : 
                    (
                        <ImageErrorMessage 
                            text='Nobody of your friends is celebrating a birthday next month' 
                            image={image}
                        />
                    )
                }
            />
        </Container>
    )
}
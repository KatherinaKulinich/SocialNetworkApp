import { useState } from "react";
import { TabPanel } from "@components/tabs/TabPanel";
import { TabsBox } from "@components/tabs/TabsBox";
import { Container } from "./BirthdaysContainer.styled"
import { BirthdayAlertCard } from "@components/cards/BirthdayAlertCard/BirthdayAlertCard";
import { ListContainer } from "../ListContainer/ListContainer";
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import image from '@images/birthBalloons.svg'
import { UserFullData } from "types/UserFullDataType";
import { useUsersBirthdays } from "hooks/useUsersBirthdays";


interface BirthdaysContainerProps {
    friendsData: UserFullData[]
}



export const BirthdaysContainer:React.FC<BirthdaysContainerProps> = ({friendsData}) => {

    const [value, setValue] = useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };


    const { usersThisMonth, usersNextMonth } = useUsersBirthdays(friendsData)
  
    

    return (
        <Container>
            <TabsBox 
                firstTabName="This month"
                secondTabName="Next month"
                onChange={handleChangeTab}
                tabsValue={value}
            />
            <TabPanel 
                value={value} 
                index={0}
            >
                {usersThisMonth.length > 0 ? (
                    <ListContainer>
                        {usersThisMonth.map(user => (
                            <BirthdayAlertCard 
                                user={user}
                                key={user.userId}
                            />
                        ))}
                    </ListContainer>
                ) : (
                    <ImageErrorMessage 
                        text='Nobody of your friends is celebrating a birthday this month' 
                        image={image}
                    />
                )}
            </TabPanel>
            
            <TabPanel 
                value={value} 
                index={1}
            >
                {usersNextMonth.length > 0 ? (
                    <ListContainer>
                        {usersNextMonth.map(user => (
                            <BirthdayAlertCard 
                                user={user} 
                                key={user.userId}
                            />
                        ))}
                    </ListContainer>
                ) : (
                    <ImageErrorMessage 
                        text='Nobody of your friends is celebrating a birthday next month' 
                        image={image}
                    />
                )}
            </TabPanel>
        </Container>
    )
}
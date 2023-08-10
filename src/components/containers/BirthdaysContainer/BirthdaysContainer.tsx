import { useState } from "react";
import { TabPanel } from "@components/tabs/TabPanel";
import { TabsBox } from "@components/tabs/TabsBox";
import { Container } from "./BirthdaysContainer.styled"
import user from '@images/userTest.jpg';
import { BirthdayAlertCard } from "@components/cards/BirthdayAlertCard/BirthdayAlertCard";
import { ListContainer } from "../ListContainer/ListContainer";
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import image from '@images/birthBalloons.svg'



export const BirthdaysContainer:React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    const [users, setUsers] = useState([])

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
                <ListContainer>
                    {users.length > 0 ? (
                            <>
                                <BirthdayAlertCard userAvatar={user} userBirthDate="10.07.2023" userName="Anna Ivanova"/>
                                <BirthdayAlertCard userAvatar={user} userBirthDate="16.07.2023" userName="Irina Belaya"/>
                                <BirthdayAlertCard userAvatar={user} userBirthDate="18.07.2023" userName="Katerina Petrova"/>
                            </>
                    ) : (
                        <ImageErrorMessage 
                            text='Nobody of your friends is celebrating a birthday this month' 
                            image={image}
                            />
                    )}
                </ListContainer>
            </TabPanel>
            
            <TabPanel 
                value={value} 
                index={1}
            >
                <ListContainer>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="10.07.2023" userName="Anna Ivanova"/>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="16.07.2023" userName="Irina Belaya"/>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="18.07.2023" userName="Katerina Petrova"/>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="10.07.2023" userName="Anna Ivanova"/>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="16.07.2023" userName="Irina Belaya"/>
                    <BirthdayAlertCard userAvatar={user} userBirthDate="18.07.2023" userName="Katerina Petrova"/>
                </ListContainer>
            </TabPanel>
        </Container>
    )
}
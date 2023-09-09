import { useCallback, useEffect, useState } from "react";
import { TabPanel } from "@components/tabs/TabPanel";
import { TabsBox } from "@components/tabs/TabsBox";
import { Container } from "./BirthdaysContainer.styled"
import user from '@images/userTest.jpg';
import { BirthdayAlertCard } from "@components/cards/BirthdayAlertCard/BirthdayAlertCard";
import { ListContainer } from "../ListContainer/ListContainer";
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage";
import image from '@images/birthBalloons.svg'
import { useUserData } from "hooks/useUserData";
import { UserFullData } from "types/UserFullDataType";



export const BirthdaysContainer:React.FC = () => {
    const [value, setValue] = useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };


    const [usersThisMonth, setUsersThisMonth] = useState<UserFullData[]>([])
    const [usersNextMonth, setUsersNextMonth] = useState<UserFullData[]>([])

    const { myFriendsData } = useUserData()


    const getUsersBirthdays = useCallback((usersArray:UserFullData[]) => {
        setUsersThisMonth([])
        setUsersNextMonth([])

        const currentMonth = new Date().getMonth()
        const currentDay = new Date().getDay()


        usersArray.map(user => {
            const { userBirthday } = user;

            if (userBirthday.month === currentMonth && userBirthday.day > currentDay) {
                setUsersThisMonth(prev => [...prev, user])
            } else if (userBirthday.month === currentMonth + 1) {
                setUsersNextMonth(prev => [...prev, user])
                return
            }
        })
    }, [])


    useEffect(() => {
        getUsersBirthdays(myFriendsData)
    }, [])

    // console.warn('this',usersThisMonth);
    // console.warn('next',usersNextMonth);
    

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
                            // <BirthdayAlertCard 
                            //     userAvatar={user.userAvatar} 
                            //     userBirthDate={user.userBirthday.fullDate} 
                            //     userName={user.fullname}
                            //     futureAge={user.userBirthday.age + 1}
                            // />
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
                            // <BirthdayAlertCard 
                            //     userAvatar={user.userAvatar} 
                            //     userBirthDate={user.userBirthday.fullDate} 
                            //     userName={user.fullname}
                            //     futureAge={user.userBirthday.age + 1}
                            // />
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
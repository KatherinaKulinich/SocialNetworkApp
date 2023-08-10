import { Container, MainInfo, Name, Personal, Subtitle, Field, RegularText, FullInfo, AboutField, AboutText } from "./UserProfile.styled"
import user from '../../../assets/images/userTest.jpg';
import { FaUsers,  FaHeart, FaBasketballBall } from 'react-icons/Fa'
import { ImLocation } from 'react-icons/Im'
import { ProfileAvatar } from "./components/ProfileAvatar/ProfileAvatar";
import { DataItem } from "./components/DataItem/DataItem";
import { PhotoPreview } from "./components/PhotosPreview/PhotoPreview";


export const UserProfile:React.FC = () => {
    return (
        <Container>
            <MainInfo>
                <ProfileAvatar userAvatarImg={user}/>
                <Personal>
                    <Name>
                        Olexandra Ivanova
                    </Name>
                    <Field>
                        <Subtitle> age: </Subtitle>
                        <RegularText> 24 y.o. </RegularText>
                    </Field>
                    <Field>
                        <Subtitle> gender: </Subtitle>
                        <RegularText> female </RegularText>
                    </Field>
                </Personal>
            </MainInfo>
            <FullInfo>
                <Personal>
                    <DataItem 
                        icon={<FaUsers/>} 
                        itemName={'Friends'} 
                        itemValue={'54'}
                    />
                    <DataItem 
                        icon={<ImLocation/>} 
                        itemName={'Lives in'} 
                        itemValue={'NYC, USA'}
                    />
                    <DataItem 
                        icon={<FaHeart/>} 
                        itemName={'Family status'} 
                        itemValue={'has boyfriend'}
                    />
                    <DataItem 
                        icon={<FaBasketballBall/>} 
                        itemName={'Interests/hobbies'} 
                        itemValue={'Basketball, piano, watercolors'}
                    />
                </Personal>
                <AboutField>
                    <Subtitle>About me</Subtitle>
                    <AboutText>   
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. In aliquam, consequatur dolorem magni, numquam labore asperiores similique corporis, culpa quasi dolores obcaecati. Commodi eligendi, animi nemo ipsam tenetur iusto corrupti.
                    </AboutText>
                </AboutField>
            </FullInfo>
            <FullInfo>
                <Personal>
                    <Subtitle>My photos</Subtitle>
                    <RegularText>See more...</RegularText>
                </Personal>
                <PhotoPreview/>
            </FullInfo>
        </Container>
    )
}
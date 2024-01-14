import imgError from '@images/error2.svg'
import { useAppSelector } from "hooks/hooks"
import { UserProfile } from "types/UserProfile"
import { CardsContainer } from "@components/containers/CardsContainer/CardsContainer"
import { LoaderComment } from "@components/loaders/LoaderComment"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { Container } from './UsersContainer.styled.ts'
import { SubTitle } from '@components/text/Subtitle'

interface UsersContainerProps {
    usersData: UserProfile[],
    usersCards: React.ReactNode,
    imageNoUsersPath: string;
    imageText: string;
    searchButton?: React.ReactNode,
    subtitleText?: string
}



export const UsersContainer:React.FC<UsersContainerProps> = ({usersData, usersCards, searchButton, imageNoUsersPath, imageText, subtitleText}) => {
    const errorMessage = useAppSelector(state => state.friends.errorMessage)
    const isLoading = useAppSelector(state => state.friends.loading)


    return (
        <Container>
            <SubTitle text={subtitleText || ''}/>
            
            {usersData?.length > 0 && (
                <CardsContainer>
                    {usersCards}
                </CardsContainer>
            )}  

            {isLoading &&  (
                <Container>
                    <LoaderComment/>
                </Container>
            )}

            {!isLoading && usersData?.length === 0 && errorMessage === '' && (
                <Container>
                    <ImageErrorMessage
                        image={imageNoUsersPath} 
                        text={imageText}
                    />
                    {searchButton}    
                </Container>
            )}

            {errorMessage !== '' && (
                <ImageErrorMessage
                    image={imgError} 
                    text="Something went wrong...Please, try later"
                />
            )}
        </Container> 
    )
}
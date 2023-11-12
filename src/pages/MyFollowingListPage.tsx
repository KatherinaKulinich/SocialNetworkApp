import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FollowingCard } from "@components/cards/userCards/FollowingCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myFollowings.svg'
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { useUserData } from "hooks/useUserData"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect } from "react"
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nofriends.svg'
import { CardsContainer } from "@components/containers/CardsContainer/CardsContainer"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { SubTitle } from "@components/text/Subtitle"






export const MyFollowingListPage: React.FC = () => {

    //TEST (friends page example})
    // const dispatch = useAppDispatch()
    // const {userData} = useUserData()
    
    // useEffect(() => {
    //     dispatch(fetchFriends(userData))
    // }, [dispatch, userData])

    // const friendsData = useAppSelector(state => state.friends.friendsData)
    // const errorMessage = useAppSelector(state => state.friends.errorMessage)

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My following'
                titleSecond="list"
            />
            <SubTitle text='You have sent friend requests to these users'/>

            {/* {friendsData.length > 0 ? (
                <CardsContainer>
                    {friendsData.map(friend => (
                        <FollowingCard 
                            key={friend.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageErrorMessage
                    image={imgNoUsers} 
                    text="You don't follow any users yet"
                />
            )}
            {errorMessage !== '' && (
                <ImageErrorMessage
                    image={imgError} 
                    text="Something went wrong...Please, try later"
                />
            )} */}
        </PageContainer>
    )
}
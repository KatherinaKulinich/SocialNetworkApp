import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { FollowingCard } from "@components/cards/userCards/FollowingCard"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import img from '@images/myFollowings.svg'
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { fetchFriends } from "rdx/slices/friendsSlice"
import { useEffect } from "react"
import imgError from '@images/error2.svg';
import imgNoUsers from '@images/nofriends.svg'
import { CardsContainer } from "@components/containers/CardsContainer/CardsContainer"
import { ImageErrorMessage } from "@components/ImageErrorMessage/ImageErrorMessage"
import { SubTitle } from "@components/text/Subtitle"
import { useAuth } from "hooks/useAuth"
import { fetchUserFullData } from "rdx/slices/userDataSlice"






export const MyFollowingListPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const myData = useAppSelector(state => state.userData.user)
    const { userId } = useAuth()

    useEffect(() => {
        const getMyProfileData = () => {
            if (userId) {
                dispatch(fetchUserFullData(userId))
            }
        }
        getMyProfileData()
    }, [])

    useEffect(() => {
        // console.log('myData', myData);
        
        if (myData) {
            dispatch(fetchFriends(myData.followingList, 'followingList'))
        }
    }, [myData])

    const followingListUsersData = useAppSelector(state => state.friends.followingListData)
    console.log(followingListUsersData);
    
    const errorMessage = useAppSelector(state => state.friends.errorMessage)
 


    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My following'
                titleSecond="list"
            />
            <SubTitle text='You have sent friend requests to these users'/>

            {followingListUsersData.length > 0 ? (
                <CardsContainer>
                    {followingListUsersData.map(user => (
                        <FollowingCard 
                            key={user.userId}
                            user={user}
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
            )} 
        </PageContainer>
    )
}
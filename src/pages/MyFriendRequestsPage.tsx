import img from '@images/myRequests.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { SubTitle } from "@components/text/Subtitle";





export const MyFriendRequestsPage: React.FC = () => {
    
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
                titleFirst='My friend'
                titleSecond="requests"
            />
            <SubTitle text='These users would like to be your friend'/>
{/* 
            {friendsData.length > 0 ? (
                <CardsContainer>
                    {friendsData.map(friend => (
                        <RequestCard 
                            key={friend.userId}
                            user={friend}
                        />
                    ))}
                </CardsContainer>
            ) : (
                <ImageErrorMessage
                    image={imgNoUsers} 
                    text="No one has sent you a friend request"
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
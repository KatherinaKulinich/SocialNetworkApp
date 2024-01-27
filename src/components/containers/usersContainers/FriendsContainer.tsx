import imgNoUsers from '@images/nofriends.svg'
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { FriendCard } from "@components/cards/userCards/FriendCard";
import { theme } from "@styles/Theme";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "types/UserProfile";
import { fetchFriends } from 'rdx/slices/friendsSlice';
import { UsersContainer } from './components/UsersContainer';




interface FriendsContainerProps {
    role: 'myFriends' | 'userFriends';
    user: UserProfile;
}



export const FriendsContainer:React.FC<FriendsContainerProps> = ({role, user}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const { userName} = user?.personalData ?? {}
    const { friends } = user?.contacts ?? {}
    const friendsIdsArray = friends?.map(user => user.id)
    
    
    useEffect(() => {
        dispatch(fetchFriends(friendsIdsArray, 'friends'))
    }, [dispatch])
    
    const friendsData = useAppSelector(state => state.friends.friendsData)


    const goToSearchPage = useCallback(() => {
        navigate('/search')
    },[])

    
    



    return (
        <UsersContainer 
            usersData={friendsData} 
            usersCards={
                friendsData?.map((friend:UserProfile) => (
                    <FriendCard 
                        key={friend.personalData.userId}
                        user={friend}
                    />
                ))
            } 
            imageNoUsersPath={imgNoUsers} 
            imageText={role === 'myFriends' ? "You haven't added any friends yet" : `${userName} hasn't added any friends yet`}
            searchButton={
                 <SecondaryButton 
                    buttonText={'Go to search'} 
                    buttonColor={theme.colors.regular} 
                    type={'button'}
                    onClickHandler={goToSearchPage}
                />
            }
        />
    )
}
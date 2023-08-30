import img from '@images/search.svg'
import errorImg from '@images/nousers.svg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { UserSearchField } from '@components/UserSearchField/UserSearchField'
import { SearchUserCard } from '@components/cards/SearchUserCard/SearchUserCard'
import { ListContainer } from '@components/containers/ListContainer/ListContainer'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import { useEffect } from 'react'
import { Filter } from '@components/Filter/Filter';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { fetchUsers } from 'rdx/slices/usersSlice';
import { SubTitle } from '@components/text/Subtitle';
import { LoaderGlass } from '@components/loaders/LoaderGlass';
import { Paragraph } from '@components/text/Paragraph';
import { theme } from '@styles/Theme';
import { filterOptions } from 'utils/profileOptions';
import { useUsersSearch } from 'hooks/useUsersSearch';





export const SearchPage:React.FC = () => {
    const dispatch = useAppDispatch();

    const { getRandomUsers, checkSearchState, getSearchOptions } = useUsersSearch();
    const { inputValue, searchValue, filterValue, onChangeFilterValue, onChangeInputValue, onChangeSearchValue } = useUsersSearch();
    const { loading, randomUsers, showEmptyUsersImg, showRandomUsers, filteredUsers  } = useUsersSearch();

    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    
    const allUsers = useAppSelector(state => state.users.users)


    useEffect(() => {
        if (allUsers.length > 5) {
            getRandomUsers(allUsers)
        }
    },[allUsers])


    useEffect(() => {
        checkSearchState(allUsers)
    }, [inputValue, searchValue])





    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='Users'
                titleSecond='search'
            />
            <Filter 
                filterOptions={filterOptions} 
                handleChange={onChangeFilterValue}
            />
            <UserSearchField 
                searchOptions={getSearchOptions(allUsers)} 
                handleChange={onChangeSearchValue}
                label={filterValue}
                value={searchValue}
                handleInputChange={onChangeInputValue}
                inputValue={inputValue}
            />
            {(!inputValue && !searchValue) ? (
                    <>
                        <SubTitle text={'You might know these users'}/>
                        <Paragraph 
                            text={'A selection of random users for you'} 
                            color={theme.colors.mediumGray}
                        />
                    </>
                ) : (
                    <SubTitle text={`Users with ${filterValue}: ${inputValue}`}/>
                )
            }
            {loading && <LoaderGlass/>}
            <ListContainer>
                {showRandomUsers && randomUsers?.length > 0 && (
                    randomUsers.map(user => {
                        if (user !== undefined) 
                            return  <SearchUserCard 
                                        key={user.userId}
                                        link={`/myFriends/${user.fullname}/profile`} 
                                        userAvatar={user.userAvatar} 
                                        userFullName={user.fullname} 
                                        userAge={user.userBirthday.age} 
                                        userLocation={user.userLocation}
                                        userInterests={user.userInterests}
                                    />
                    })
                )}

                {filteredUsers.length > 0 && (
                    filteredUsers.map(user => (
                        <SearchUserCard 
                            key={user.userId}
                            link={`/myFriends/${user.fullname}/profile`} 
                            userAvatar={user.userAvatar} 
                            userFullName={user.fullname} 
                            userAge={user.userBirthday.age} 
                            userLocation={user.userLocation}
                            userInterests={user.userInterests}
                        />
                    ))
                )}

                {showEmptyUsersImg && (
                    <ImageErrorMessage 
                        image={errorImg} 
                        text={`no users for this query: ${inputValue}`}
                    />
                )}
            </ListContainer>
        </PageContainer>
    )
}
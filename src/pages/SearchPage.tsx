import img from '@images/search.svg'
import user from '@images/userTest.jpg'
import errorImg from '@images/nousers.svg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { UserSearchField } from '@components/UserSearchField/UserSearchField'
import { SearchUserCard } from '@components/cards/SearchUserCard/SearchUserCard'
import { ListContainer } from '@components/containers/ListContainer/ListContainer'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import { useState } from 'react'



export const SearchPage:React.FC = () => {
    const [users, setUsers] = useState(['1'])

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='Users'
                titleSecond='search'
            />
            <UserSearchField/>
            <ListContainer>
                {users.length > 0 ? (
                    <>
                        <SearchUserCard 
                            link={'/myFriends/profile'} 
                            userAvatar={user} 
                            userFullName={'Alina Petrova'} 
                            userAge={'21'} 
                            userLocation={'Kharkiv, Ukraine'}
                        />
                        <SearchUserCard 
                            link={''} 
                            userAvatar={user} 
                            userFullName={'Alina Petrova'} 
                            userAge={'21'} 
                            userLocation={'Kharkiv, Ukraine'}
                        />
                        <SearchUserCard 
                            link={''} 
                            userAvatar={user} 
                            userFullName={'Alina Petrova'} 
                            userAge={'21'} 
                            userLocation={'Kharkiv, Ukraine'}
                        />
                    </>
                    ) : (
                        <ImageErrorMessage 
                        image={errorImg} 
                        text='no user found with this name'
                        />
                    )
                }
            </ListContainer>
        </PageContainer>
    )
}
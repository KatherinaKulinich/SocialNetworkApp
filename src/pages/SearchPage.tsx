import img from '@images/search.svg'
import errorImg from '@images/nousers.svg';
import errorImg2 from '@images/error1.svg';
import { PageImgTitle } from '@components/PageImgTitle/PageImgTitle'
import { UserSearchField } from '@components/UserSearchField/UserSearchField'
import { SearchUserCard } from '@components/cards/SearchUserCard/SearchUserCard'
import { ListContainer } from '@components/containers/ListContainer/ListContainer'
import { PageContainer } from '@components/containers/PageContainer/PageContainer'
import { ImageErrorMessage } from '@components/ImageErrorMessage/ImageErrorMessage'
import { Filter } from '@components/Filter/Filter';
import { SubTitle } from '@components/text/Subtitle';
import { LoaderGlass } from '@components/loaders/LoaderGlass';
import { Paragraph } from '@components/text/Paragraph';
import { theme } from '@styles/Theme';
import { selectOptions } from 'utils/data/profileOptions';
import { useCallback, useEffect, useState } from 'react';
import { useSearchValues } from 'hooks/search/useSearchValues';
import { useUsersSearch } from 'hooks/search/useUsersSearch';
import { UserProfile } from 'types/UserProfile';






export const SearchPage:React.FC = () => {
    const [filterOptions, setFilterOptions] = useState<any[]>([])
    // const [filterValue, setFilterValue] = useState('name')
    // const [searchValue, setSearchValue] = useState('')
    // const [inputValue, setInputValue] = useState('')


    // const onChangeFilterValue = useCallback((value: string) => {
    //     setFilterValue(value)
    //     setSearchValue('')
    // }, [filterValue])

    // const onChangeSearchValue = useCallback((event:any, value:string) => {
    //     setSearchValue(value)
    // }, [searchValue])


    // const onChangeInputValue = useCallback((event:any, value:string) => {
    //     setInputValue(value)
    // }, [inputValue])

    const { 
        filterValue, 
        searchValue, 
        inputValue, 
        onChangeFilterValue,
        onChangeInputValue, 
        onChangeSearchValue 
    } = useSearchValues()

    console.log(filterValue, searchValue, inputValue);
    console.log(filterOptions);
    
    

    const {
        loading, 
        randomUsers, 
        showEmptyUsersImg, 
        showRandomUsers, 
        filteredUsers, 
        namesOptions, 
        interestsOptions, 
        locationsOptions, 
        errorMessage  
    } = useUsersSearch(filterValue, inputValue, searchValue);

  
    
    const getSearchOptions = useCallback(() => {
        setFilterOptions([])
        
        if (filterValue === 'name') {
            setFilterOptions(namesOptions)
            return;
        }
        if (filterValue === 'interests') {
            setFilterOptions(interestsOptions)
            return;
        }
        if (filterValue === 'location') {
            setFilterOptions(locationsOptions)
            return;
        }
    }, [filterValue, namesOptions, interestsOptions, locationsOptions])


    useEffect(() => {
        getSearchOptions()
    }, [filterValue, namesOptions, interestsOptions, locationsOptions])

    
    

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='Users'
                titleSecond='search'
            />
            <Filter 
                filterOptions={selectOptions} 
                handleChange={onChangeFilterValue}
            />
            <UserSearchField 
                searchOptions={filterOptions} 
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
                    randomUsers.map((user:UserProfile) => {
                        if (user !== undefined) 
                            return  <SearchUserCard 
                                        key={user.personalData.userId}
                                        user={user}
                                    />
                    })
                )}

                {!showRandomUsers && filteredUsers.length > 0 && (
                    filteredUsers.map(user => (
                        <SearchUserCard 
                            key={user.personalData.userId}
                            user={user}
                        />
                    ))
                )}

                {showEmptyUsersImg && (
                    <ImageErrorMessage 
                        image={errorImg2} 
                        text={`no users for this query: ${inputValue}`}
                    />
                )}
                {errorMessage.length > 0 && (
                    <ImageErrorMessage 
                        image={errorImg} 
                        text={`Sorry, but something went wrong!`}
                    />
                )}
            </ListContainer>
        </PageContainer>
    )
}
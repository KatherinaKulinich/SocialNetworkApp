import { SetStateAction, useCallback, useState } from "react";
import { UserFullData } from "types/UserFullDataType";




export const useUsersSearch = () => {
    const [filterValue, setFilterValue] = useState('name')
    const [searchValue, setSearchValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    const [filteredUsers, setFilteredUsers] = useState<UserFullData[]>([])
    const [showEmptyUsersImg, setShowEmptyUsersImg] = useState(false)
    
    const [loading, setLoading] = useState(false)

    const [randomUsers, setRandomUsers] = useState<UserFullData[]>([])
    const [showRandomUsers, setShowRandomUsers] = useState(false)



    const onChangeFilterValue = useCallback((value: SetStateAction<string>) => {
        setFilterValue(value)
        setSearchValue('')
    }, [filterValue])

    const onChangeSearchValue = useCallback((event:any, value:SetStateAction<string>) => {
        setSearchValue(value)
    }, [searchValue])


    const onChangeInputValue = useCallback((event:any, value:SetStateAction<string>) => {
        setInputValue(value)
    }, [inputValue])


    const getRandomUsers = useCallback((users:UserFullData[]) => {
        let usersArray: UserFullData[] = [];

        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * users.length) + 1;
            usersArray.push(users[random])
        }
        setRandomUsers([...new Set(usersArray)])
    }, [])



    const getSearchOptions = useCallback((users:UserFullData[]) => {
        let options:any[] = [];

        if (filterValue === 'name') {
            options = [];
            users.map((user: UserFullData) => {
                const { fullname } = user;
                options.push(fullname)
            })
            return options;
        }

        if (filterValue === 'interests') {
            options = [];
            let arrayInterests:any[] = [];

            users.map((user: UserFullData) => {
                const { userInterests } = user;
                arrayInterests.push(userInterests)
            })
            options = [...new Set(arrayInterests.flat())]
            return options;
        }
        
        if (filterValue === 'location') {
            options = [];
            let arrayLocations:any[] = [];

            users.map((user: UserFullData) => {
                const { userLocation } = user;
                arrayLocations.push(userLocation)
            })
            options = [...new Set(arrayLocations.flat())]
            return options;
        }
        return options;
    }, [filterValue])



    const getFilteredUsers = useCallback((users:UserFullData[]) => {
        setFilteredUsers([])

        if (inputValue === searchValue) {
            if (filterValue === 'name') {
                users.map((user) => {
                    const { fullname } = user;
    
                    if (fullname === searchValue) {
                        setFilteredUsers(prev => [...prev, user])
                    }
                })
                return
            }
            if (filterValue === 'location') {
                users.map((user) => {
                    const { userLocation } = user;
    
                    if (userLocation === searchValue) {
                        setFilteredUsers(prev => [...prev, user])
                    }
                })
                return
            }
            if (filterValue === 'interests') {
                users.map((user) => {
                    const { userInterests } = user;
    
                    if (userInterests.includes(searchValue)) {
                        setFilteredUsers(prev => [...prev, user])
                    }
                })
                return
            }
        }
    }, [filterValue, searchValue, inputValue])




    const checkSearchState = useCallback((users:UserFullData[]) => {
        setFilteredUsers([])

        if (inputValue && searchValue) {
            if (inputValue.length > searchValue.length) {
                setShowEmptyUsersImg(true)
                setLoading(false)
                setShowRandomUsers(false)
                setFilteredUsers([])
                return
            }
            if (inputValue.length < searchValue.length) {
                setShowEmptyUsersImg(false)
                setLoading(true)
                setShowRandomUsers(false)
                return
            }
            if (inputValue === searchValue) {
                setShowEmptyUsersImg(false)
                setLoading(false)
                setShowRandomUsers(false)
                getFilteredUsers(users)
                return
            }
            return
        }
        if (inputValue && searchValue === null) {
            setShowEmptyUsersImg(true)
            setLoading(false)
            setShowRandomUsers(false)
            return
        }
        if (inputValue && searchValue === '') {
            setShowEmptyUsersImg(false)
            setLoading(true)
            setShowRandomUsers(false)
            return
        }
        if (!inputValue && searchValue === '' || searchValue === null) {
            setShowEmptyUsersImg(false)
            setLoading(false)
            setShowRandomUsers(true)
            return
        }
    }, [inputValue, searchValue])




    
    return {
        getRandomUsers,
        checkSearchState,
        getSearchOptions,
        inputValue,
        searchValue,
        filterValue,
        onChangeFilterValue,
        onChangeSearchValue,
        onChangeInputValue,
        loading,
        randomUsers,
        showRandomUsers,
        filteredUsers,
        showEmptyUsersImg
    }
}
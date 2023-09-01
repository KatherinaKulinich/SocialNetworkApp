import { fetchFilteredUsers, fetchRandomUsers, fetchUsersOptions } from "rdx/slices/usersSlice";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { UserFullData } from "types/UserFullDataType";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useUserData } from "./useUserData";




export const useUsersSearch = () => {
    const dispatch = useAppDispatch();
    const [filterValue, setFilterValue] = useState('name')
    const [searchValue, setSearchValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    const [filteredUsers, setFilteredUsers] = useState<UserFullData[]>([])
    const [showEmptyUsersImg, setShowEmptyUsersImg] = useState(false)
    
    const [loading, setLoading] = useState(false)

    const [showRandomUsers, setShowRandomUsers] = useState(false)

    const namesOptions = useAppSelector(state => state.users.optionsNames)
    const locationsOptions = useAppSelector(state => state.users.optionsLocations)
    const interestsOptions = useAppSelector(state => state.users.optionsInterests)
 

    const { userCity, userCountry, userId } = useUserData()


    useEffect(() => {
        dispatch(fetchUsersOptions())
    }, [dispatch, filterValue])


    useEffect(() => {
        dispatch(fetchRandomUsers(userCountry, userCity, userId))
    }, [dispatch, userCountry, userCity])


    const randomUsers = useAppSelector(state => state.users.randomUsers)
    const foundUsers = useAppSelector(state => state.users.filteredUsers)
    const errorMessage = useAppSelector(state => state.users.error)


    useEffect(() => {
        checkSearchState()
    }, [inputValue, searchValue])



    const onChangeFilterValue = useCallback((value: string) => {
        setFilterValue(value)
        setSearchValue('')
    }, [filterValue])

    const onChangeSearchValue = useCallback((event:any, value:string) => {
        setSearchValue(value)
    }, [searchValue])


    const onChangeInputValue = useCallback((event:any, value:string) => {
        setInputValue(value)
    }, [inputValue])



    useEffect(() => {
        setFilteredUsers(foundUsers)
    }, [foundUsers])




    const getFilteredUsers = useCallback(() => {
        setFilteredUsers([])

        if (inputValue === searchValue) {
            if (filterValue === 'name') {
                dispatch(fetchFilteredUsers('fullname', searchValue))
                return
            }
            if (filterValue === 'location') {
                dispatch(fetchFilteredUsers('userLocation', searchValue))
                return
            }
            if (filterValue === 'interests') {
                dispatch(fetchFilteredUsers('userInterests', searchValue))
                return
            }
        }
    }, [filterValue, searchValue, inputValue,  foundUsers, filteredUsers])




    const checkSearchState = useCallback(() => {
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
                getFilteredUsers()
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
        if (errorMessage !== '' ) {
            setShowEmptyUsersImg(false)
            setLoading(false)
            setShowRandomUsers(false)
            setFilteredUsers([])
            return
        }
    }, [inputValue, searchValue, errorMessage])




    
    return {
        checkSearchState,
        inputValue,
        searchValue,
        filterValue,
        onChangeFilterValue,
        onChangeSearchValue,
        onChangeInputValue,
        loading,
        showRandomUsers,
        filteredUsers,
        showEmptyUsersImg,
        randomUsers,
        namesOptions,
        interestsOptions, 
        locationsOptions,
        errorMessage
    }
}
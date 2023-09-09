import { fetchFilteredUsers, fetchRandomUsers, fetchUsersOptions } from "rdx/slices/usersSlice";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { UserFullData } from "types/UserFullDataType";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useUserData } from "./useUserData";




export const useUsersSearch = (filterValue:string, inputValue:string, searchValue:string) => {
    const dispatch = useAppDispatch();
    const [filteredUsers, setFilteredUsers] = useState<UserFullData[]>([])
    const [showEmptyUsersImg, setShowEmptyUsersImg] = useState(false)
    
    const [loading, setLoading] = useState(false)
    const [showRandomUsers, setShowRandomUsers] = useState(false)

    const namesOptions = useAppSelector(state => state.users.optionsNames)
    const locationsOptions = useAppSelector(state => state.users.optionsLocations)
    const interestsOptions = useAppSelector(state => state.users.optionsInterests)
 
    const { userData } = useUserData()
    const { userCity, userCountry, userId, fullname } = userData;


    useEffect(() => {
        dispatch(fetchUsersOptions(fullname))
    }, [dispatch, filterValue])


    useEffect(() => {
        dispatch(fetchRandomUsers(userCountry, userCity, userId))
    }, [dispatch, userCountry, userCity])


    const randomUsers:UserFullData[]  = useAppSelector(state => state.users.randomUsers)
    const foundUsers:UserFullData[] = useAppSelector(state => state.users.filteredUsers)
    const errorMessage:string = useAppSelector(state => state.users.error)


    useEffect(() => {
        checkSearchState()
    }, [inputValue, searchValue])


    useEffect(() => {
        setFilteredUsers(foundUsers)
    }, [foundUsers])




    const getFilteredUsers = useCallback(() => {
        setFilteredUsers([])

        if (inputValue === searchValue) {
            if (filterValue === 'name') {
                dispatch(fetchFilteredUsers('fullname', searchValue, userId))
                return
            }
            if (filterValue === 'location') {
                dispatch(fetchFilteredUsers('userLocation', searchValue, userId))
                return
            }
            if (filterValue === 'interests') {
                dispatch(fetchFilteredUsers('userInterests', searchValue, userId))
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
// import { useAppDispatch, useAppSelector } from "hooks/hooks";
// import { fetchFilteredUsers, fetchRandomUsers } from "rdx/slices/usersSlice";
// import { useState, useCallback, useEffect } from "react";
// import { UserProfile } from "types/UserProfile";





// export const useSearchState = (filterValue:string, inputValue:string, searchValue:string) => {
//     const dispatch = useAppDispatch();

//     const randomUsers:UserProfile[]  = useAppSelector(state => state.users.randomUsers)
//     const foundUsers:UserProfile[] = useAppSelector(state => state.users.filteredUsers)

//     const myData = useAppSelector(state => state.userData.user)
//     const { userId:myId } = myData.personalData
//     const { userCountry, userCity} = myData.profileData

//     const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])


//     useEffect(() => {
//         setFilteredUsers(foundUsers)
//     }, [foundUsers])

//     useEffect(() => {
//         dispatch(fetchRandomUsers(userCountry, userCity, myId))
//     }, [dispatch, userCountry, userCity])





//     const getFilteredUsers = useCallback(() => {
//         setFilteredUsers([])

//         if (inputValue === searchValue) {
//             if (filterValue === 'name') {
//                 dispatch(fetchFilteredUsers('personalData.userFullname', searchValue, myId))
//                 return
//             }
//             if (filterValue === 'location') {
//                 dispatch(fetchFilteredUsers('profileData.userLocation', searchValue, myId))
//                 return
//             }
//             if (filterValue === 'interests') {
//                 dispatch(fetchFilteredUsers('profileData.userInterests', searchValue, myId))
//                 return
//             }
//         }
//     }, [filterValue, searchValue, inputValue,  foundUsers, filteredUsers])


//     return {
//         filteredUsers,
//         randomUsers,
//         getFilteredUsers, 
//         setFilteredUsers,
//     }
// }
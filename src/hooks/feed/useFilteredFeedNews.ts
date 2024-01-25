// import { useCallback, useState } from "react"



// export const useFilteredFeedNews = () => {
//     const [index, setIndex] = useState<number>(1)
//     const [filterValue, setFilterValue] = useState('all')
//     const [feedCards, setFeedCards] = useState<JSX.Element[]>([])


//     const loadMoreNews = useCallback(() => {
//         setIndex(prev => prev+1)
//     }, [index])

//     const onChangeFilterValue = useCallback((value: string) => {
//         setFilterValue(value)
//         setIndex(1)
//     }, [filterValue, index])

//     return {
//         index,
//         filterValue,
//         loadMoreNews,
//         onChangeFilterValue
//     }
// }
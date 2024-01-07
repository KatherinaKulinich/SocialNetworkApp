import { useState, useCallback } from "react"




export const useSearchValues = () => {
    const [filterValue, setFilterValue] = useState('name')
    const [searchValue, setSearchValue] = useState('')
    const [inputValue, setInputValue] = useState('')


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

    
    return {
        filterValue,
        searchValue,
        inputValue,
        onChangeFilterValue,
        onChangeInputValue,
        onChangeSearchValue
    }
}
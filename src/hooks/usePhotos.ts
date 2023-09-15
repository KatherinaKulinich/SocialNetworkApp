import { useCallback } from "react"
import { useAuth } from "./useAuth"

export const usePhotos = () => {
    const { userId } = useAuth()

    const AddNewPhoto = useCallback((values: any) => {
        
    }, [])

    return {}
}
import { useCallback, useState } from "react"

export const useModalForComments = () => {
    const [isModalComments, setIsModalComments] = useState(false)

    const onOpenModalComments = useCallback(() => {
        setIsModalComments(true)
    }, [isModalComments])
    
    const onCloseModalComments = useCallback(() => {
        setIsModalComments(false)
    }, [isModalComments])
    
    return {
        isModalComments,
        onCloseModalComments,
        onOpenModalComments
    }
}
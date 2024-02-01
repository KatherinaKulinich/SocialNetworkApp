import { useCallback, useState } from "react"


export const useModalForEditing = () => {
    const [isModalEditionOpen, setIsModalEditionOpen] = useState(false)

    const onOpenModalEdition = useCallback(() => {
        setIsModalEditionOpen(true)
    }, [isModalEditionOpen])

    const onCloseModalEdition = useCallback(() => {
        setIsModalEditionOpen(false)
    }, [isModalEditionOpen])

    return {
        isModalEditionOpen,
        onCloseModalEdition,
        onOpenModalEdition
    }
}
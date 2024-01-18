import { useMyFullData } from "hooks/useMyFullData"

export const useFeedUpdates = () => {
    const myData = useMyFullData()

    const { friends } = myData?.contacts ?? {}
    const friendsIds = friends?.map(friend => friend.id)


    return {

    }
}
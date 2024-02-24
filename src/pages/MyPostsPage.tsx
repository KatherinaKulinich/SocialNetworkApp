import img from '@images/myPosts.svg'
import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PostPreview } from "@components/cards/UserProfile/components/PostsPreview/PostPreview"
import { AddingNewPostCard } from "@components/cards/postsCards/AddingNewPostCard/AddingNewPostCard"
import { ListContainer } from "@components/containers/ListContainer/ListContainer"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { useMyFullData } from 'hooks/useMyFullData'
import { useAppDispatch } from 'hooks/hooks'
import { fetchUserFullData } from 'rdx/slices/userDataSlice'
import { useCallback } from 'react'




export const MyPostsPage: React.FC = () => {
    const myData = useMyFullData()
    const dispatch = useAppDispatch()
    const { userId:myId } = myData?.personalData ?? {};

    const refreshDataAfterPhotoLike = useCallback(() => {
        setTimeout(() => {
            dispatch(fetchUserFullData(myId))
        },2000)
    }, [dispatch, myData])
  

    return (
        <PageContainer>
            <PageImgTitle 
                image={img} 
                titleFirst='My'
                titleSecond="posts"
            />
            <ListContainer>
                <AddingNewPostCard/>
                <PostPreview
                    postOwner='myProfile'
                    ownerData={myData}
                    refreshData={refreshDataAfterPhotoLike}
                />
            </ListContainer>
        </PageContainer>
    )
}
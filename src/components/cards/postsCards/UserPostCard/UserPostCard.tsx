import { PostCard } from "../components/PostCard"
import { UserInfo, PostTime, Text, Reactions, ReactionItem, DateField, CommentsButton, Info, PostControls, ControlButton, PostContent, ReactionBox, PostText } from "./UserPostCard.styled"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Post } from "types/Post"
import { useCallback, useEffect, useState } from "react"
import { Reaction } from "types/Post"
import { RadioChangeEvent, Popconfirm } from "antd"
import { reactionsArray } from "utils/data/postReactions"
import { DeleteOutlined } from "@ant-design/icons"
import { useManageMyContent } from "hooks/content/useManageMyContent"
import { getSelectedUserPost } from "rdx/slices/userContentSlice"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { usePostsReactions } from "hooks/content/usePostsReactions"
import { useCheckMyContentReaction } from "hooks/content/useCheckMyContentReaction"
import { UserProfile } from "types/UserProfile"
import { ReactionAnimation } from "@components/animations/ReactionAnimation/ReactionAnimation"
import {v4 as uuidv4} from 'uuid';
import { getDate, getTime } from "utils/getDateFormat";



interface UserPostCardProps {
    post: Post,
    owner: 'myProfile' | 'userProfile';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    postOwner: UserProfile;
    refreshData: () => void;
}





export const UserPostCard:React.FC<UserPostCardProps> = ({owner, post, onOpenModalForEditing, onOpenModalWithComments, postOwner, refreshData}) => {
    const {postOwnerName, postOwnerAvatar, date, postReactions, postComments, postText} = post;

    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userData.user)


    const { deleteMyContent } = useManageMyContent()
    const { addReaction } = usePostsReactions()
    const { checkMyPostReaction } = useCheckMyContentReaction(userData)

    const [reactionValue, setReactionValue] = useState(checkMyPostReaction(post))
    const [initialValue, setInitialValue] = useState<string>('')
    const [isAnimation, setIsAnimation] = useState<string | null>(null)



    const onChangeReactionValue = useCallback(async ({ target: { value }}: RadioChangeEvent) => {
        resetAnimation()
        setReactionValue(value)
        setTimeout(() => setIsAnimation(value))
        await addReaction(post, postOwner, value)
        refreshData()
    },[post, postOwner])


    const resetAnimation = useCallback(() => {
        setIsAnimation(null)
    }, [isAnimation])


    useEffect(() => {
        if (isAnimation !== null) {
            setTimeout(() => resetAnimation(), 3000)
        }
    }, [isAnimation])



    const removePost = useCallback(() => {
        deleteMyContent(post)
    }, [post])

    const onOpenModalEditing = useCallback(() => {
        dispatch(getSelectedUserPost(post))
        onOpenModalForEditing()
    }, [dispatch, post])

    const onOpenModalComments = useCallback(() => {
        dispatch(getSelectedUserPost(post))
        onOpenModalWithComments()
    }, [dispatch, post])


    useEffect(() => {
        setInitialValue(checkMyPostReaction(post))
    }, [post])

    useEffect(() => {
        if (initialValue) {
            setReactionValue(initialValue)
        }
    }, [initialValue])

    const postDate =  getDate(date);
    const postTime = getTime(date);
    const itemKey = uuidv4()







    return (
        <PostCard 
            header={
                <>
                    <UserInfo>
                        <Avatar 
                            photo={postOwnerAvatar} 
                            border={theme.colors.regularLight} 
                            size={"30px"}
                        />
                        <Text>{postOwnerName}</Text>
                    </UserInfo>
                    <Info>
                        {date && (
                            <DateField>
                                <Text>{postDate}</Text>
                                <PostTime>{postTime}</PostTime>
                            </DateField>
                        )}
                    </Info>
                </>
            } 
            content={
                <>
                    <PostContent>
                        <PostText>
                            {postText}
                        </PostText>
                    </PostContent>
                    {owner === 'myProfile' && (
                       <PostControls>
                            <ControlButton onClick={onOpenModalEditing}>
                                Edit post
                            </ControlButton>
                            <Popconfirm
                                title="Delete this post"
                                description="Are you sure to delete this post?"
                                icon={<DeleteOutlined style={{ color: 'lightGray' }} />}
                                onConfirm={removePost}
                            >
                                <ControlButton>
                                    Delete post
                                </ControlButton>
                            </Popconfirm>
                       </PostControls>
                    )}
                </>
            } 
            footer={
                <>
                    <Reactions 
                        value={reactionValue} 
                        onChange={onChangeReactionValue}
                        name="reactions"
                    >
                        {postReactions?.map((reactionItem:Reaction, mainIndex) => {
                            return reactionsArray.map((arrayItem) => {
                                return arrayItem.value === reactionItem.value && 
                                    (
                                        <ReactionBox key={mainIndex}>
                                            <ReactionItem 
                                                value={reactionItem.value} 
                                                $items={reactionItem.usersReactions.length} 
                                                key={`${itemKey}${reactionItem.value}`}
                                            >
                                                <p>{arrayItem.label}</p>
                                            </ReactionItem>
                                            {isAnimation === reactionItem.value &&
                                                (
                                                    <ReactionAnimation 
                                                        value={arrayItem.label} 
                                                        key={`${itemKey}${mainIndex}`}
                                                    />
                                                )
                                            }
                                        </ReactionBox>
                                    )
                            })
                        })}
                    </Reactions>
                    <CommentsButton 
                        $items={postComments.length} 
                        onClick={onOpenModalComments}
                    >
                        Comments
                    </CommentsButton>
                </>
            }
        />
    )
}
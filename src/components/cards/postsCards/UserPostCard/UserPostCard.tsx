import { UserFullData } from "types/UserFullDataType"
import { PostCard } from "../components/PostCard"
import { UserInfo, PostTime, Text, Reactions, ReactionItem, DateField, CommentsButton, Info, PostControls, ControlButton, PostContent } from "./UserPostCard.styled"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Post } from "types/Post"
import { useCallback, useEffect, useState } from "react"
import { Reaction } from "types/Post"
import { RadioChangeEvent, Popconfirm } from "antd"
import { reactionsArray } from "utils/profileOptions"
import { DeleteOutlined } from "@ant-design/icons"
import { useManageMyContent } from "hooks/useManageMyContent"
import { useUserData } from "hooks/useUserData"
import { getSelectedUserPost } from "rdx/slices/userContentSlice"
import { useAppDispatch } from "hooks/hooks"
import { usePostsReactions } from "hooks/usePostsReactions"



interface UserPostCardProps {
    post: Post,
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    postOwner: UserFullData;
}

export const UserPostCard:React.FC<UserPostCardProps> = ({owner, post, onOpenModalForEditing, onOpenModalWithComments, postOwner}) => {
    const {postOwnerName, postOwnerAvatar, postDate, postReactions, postComments, postText} = post;

    const { posts } = postOwner;

    const { deleteMyContent } = useManageMyContent()
    const { userData } = useUserData()
    const dispatch = useAppDispatch()
    const { addReaction, checkMyReaction } = usePostsReactions()

    const [reactionValue, setReactionValue] = useState('')
    const [initialValue, setInitialValue] = useState<string | false>(false)


    const onChangeReactionValue = useCallback(({ target: { value }}: RadioChangeEvent) => {
        setReactionValue(value)
        addReaction(post, postOwner, value)
    },[post, postOwner])

    const date = new Date(postDate);

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
        setInitialValue(checkMyReaction(post))
    }, [post])

    useEffect(() => {
        if (initialValue) {
            setReactionValue(initialValue)
        }
    }, [initialValue])



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
                        {postDate && (
                            <DateField>
                                <Text>{`${date.getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(postDate)} ` }</Text>
                                <PostTime>{`${date.getHours()}:${date.getMinutes()}`}</PostTime>
                            </DateField>
                        )}
                    </Info>
                </>
            } 
            content={
                <>
                    <PostContent>
                        <p>
                            {postText}
                        </p>
                    </PostContent>
                    {owner === 'me' && (
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
                    >
                        {postReactions?.map((reactionItem:Reaction) => {
                            return reactionsArray.map((arrayItem) => {
                                return arrayItem.value === reactionItem.value && 
                                    (
                                        <ReactionItem 
                                            value={reactionItem.value} 
                                            $items={reactionItem.usersReactions.length} 
                                            key={reactionItem.value}
                                        >
                                            <p>{arrayItem.label}</p>
                                        </ReactionItem>
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
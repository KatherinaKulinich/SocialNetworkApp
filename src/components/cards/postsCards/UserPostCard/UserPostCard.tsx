import { UserFullData } from "types/UserFullDataType"
import { PostCard } from "../components/PostCard"
import { UserInfo, PostTime, Text, Reactions, ReactionItem, DateField, CommentsButton, Info, PostControls, ControlButton, PostContent } from "./UserPostCard.styled"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"
import { Post } from "types/Post"
import { useCallback, useState } from "react"
import { Reaction } from "types/Post"
import { RadioChangeEvent, Popconfirm } from "antd"
import { reactionsArray } from "utils/profileOptions"
import { DeleteOutlined } from "@ant-design/icons"
import { useManageMyContent } from "hooks/useManageMyContent"
import { useUserData } from "hooks/useUserData"
import { getSelectedUserPost } from "rdx/slices/userContentSlice"
import { useAppDispatch } from "hooks/hooks"



interface UserPostCardProps {
    post: Post,
    owner: 'me' | 'friend';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
}

export const UserPostCard:React.FC<UserPostCardProps> = ({owner, post, onOpenModalForEditing, onOpenModalWithComments}) => {
    const {postOwnerName, postOwnerAvatar, postDate, postReactions, postComments, postText} = post;
    const { deleteMyContent } = useManageMyContent()
    const { userData } = useUserData()
    const { posts } = userData;
    const dispatch = useAppDispatch()

    const [reactionValue, setReactionValue] = useState('')
    const onChangeReactionValue = ({ target: { value }}: RadioChangeEvent) => {
        setReactionValue(value)
    }

    const date = new Date(postDate);

    const removePost = useCallback(() => {
        deleteMyContent(post)
    }, [posts])

    const onOpenModalEditing = useCallback(() => {
        dispatch(getSelectedUserPost(post))
        onOpenModalForEditing()
    }, [dispatch, posts])

    const onOpenModalComments = useCallback(() => {
        dispatch(getSelectedUserPost(post))
        onOpenModalWithComments()
    }, [dispatch, posts])


    
    

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
                        // disabled
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
import { PostCard } from "../components/PostCard"
import { UserInfo, PostTime, Text, Reactions, ReactionItem, DateField, CommentsButton, Info, PostControls, ControlButton, PostContent, ReactionBox } from "./UserPostCard.styled"
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
import { ReactionAnimation } from "@components/ReactionAnimation/ReactionAnimation"
import {v4 as uuidv4} from 'uuid';
import { useMyFullData } from "hooks/useMyFullData"



interface UserPostCardProps {
    post: Post,
    owner: 'myProfile' | 'userProfile';
    onOpenModalForEditing: () => void;
    onOpenModalWithComments: () => void;
    postOwner: UserProfile;
}





export const UserPostCard:React.FC<UserPostCardProps> = ({owner, post, onOpenModalForEditing, onOpenModalWithComments, postOwner}) => {
    const {postOwnerName, postOwnerAvatar, date, postReactions, postComments, postText} = post;

    const dateFormat = new Date(date);
    const dispatch = useAppDispatch()
    const userData = useMyFullData()


    const { deleteMyContent } = useManageMyContent()
    const { addReaction } = usePostsReactions()
    const { checkMyPostReaction } = useCheckMyContentReaction(userData)

    const [reactionValue, setReactionValue] = useState('')
    const [initialValue, setInitialValue] = useState<string | false>(false)
    const [isAnimation, setIsAnimation] = useState<string | null>(null)



    const onChangeReactionValue = useCallback(async ({ target: { value }}: RadioChangeEvent) => {
        resetAnimation()
        setReactionValue(value)
        await addReaction(post, postOwner, value)
        setTimeout(() => setIsAnimation(value),500)
    },[post, postOwner])


    const resetAnimation = useCallback(() => {
        setIsAnimation(null)
    }, [isAnimation])


    useEffect(() => {
        if (isAnimation !== null) {
            setTimeout(() => resetAnimation(), 4000 )
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

    const postDate = `${dateFormat.getDate()} ${new Intl.DateTimeFormat("en-US", {month: 'long'}).format(date)} `;
    const postTime = `${dateFormat.getHours()}:${dateFormat.getMinutes()}`;





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
                        <p>
                            {postText}
                        </p>
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
                    >
                        {postReactions?.map((reactionItem:Reaction) => {
                            return reactionsArray.map((arrayItem) => {
                                return arrayItem.value === reactionItem.value && 
                                    (
                                        <ReactionBox>
                                            <ReactionItem 
                                                value={reactionItem.value} 
                                                $items={reactionItem.usersReactions.length} 
                                                key={uuidv4()}
                                            >
                                                <p>{arrayItem.label}</p>
                                            </ReactionItem>
                                            {isAnimation === reactionItem.value &&
                                                (
                                                    <ReactionAnimation 
                                                        value={arrayItem.label} 
                                                        key={uuidv4()}
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
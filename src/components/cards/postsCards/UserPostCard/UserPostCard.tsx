import { UserFullData } from "types/UserFullDataType"
import { PostCard } from "../components/PostCard"
import { UserData, PostTime, Text, Reactions, ReactionItem, Date, CommentsButton } from "./UserPostCard.styled"
import { Avatar } from "@components/Avatar/Avatar"
import { theme } from "@styles/Theme"


interface UserPostCardProps {
    user?: UserFullData,
    post?: any,
}

export const UserPostCard:React.FC<UserPostCardProps> = ({}) => {
    return (
        <PostCard 
            header={
                <>
                    <UserData>
                        <Avatar 
                            photo={""} 
                            border={theme.colors.regularLight} 
                            size={"30px"}
                        />
                        <Text>Anna</Text>
                    </UserData>
                    <Date>
                        <Text>16 March</Text>
                        <PostTime>11:34</PostTime>
                    </Date>
                </>
            } 
            content={
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, repudiandae eaque. Sed quidem delectus quae, ipsa dignissimos molestiae ducimus velit aut aperiam animi numquam cumque magni. Hic minima incidunt vitae!
                    Ad in corporis unde vero nostrum natus. Placeat laboriosam dicta ratione inventore recusandae? Omnis consequuntur eligendi fuga perferendis provident nostrum repellendus magnam, voluptas laboriosam? Suscipit vero magni tempore pariatur quas.
                </p>
            } 
            footer={
                <>
                    <Reactions>
                        <ReactionItem $items={'3'}><p>🥰</p></ReactionItem>
                        <ReactionItem $items={'5'}><p>😂</p></ReactionItem>
                        <ReactionItem $items={'11'}><p>😎</p></ReactionItem>
                        <ReactionItem $items={'0'}><p>😞</p></ReactionItem>
                        <ReactionItem $items={'123'}><p>😳</p></ReactionItem>
                    </Reactions>
                    <CommentsButton $items={'23'}>
                        Comments
                    </CommentsButton>
                </>
            }
        />
    )
}
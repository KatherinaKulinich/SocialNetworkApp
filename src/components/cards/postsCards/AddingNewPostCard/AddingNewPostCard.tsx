import image from '@images/newPost.svg'
import { SubTitle } from "@components/text/Subtitle"
import { PostCard } from "../components/PostCard"
import { CreatingPostField, TextField, CardImage, Wrap } from "./AddingNewPostCard.styled"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from "@styles/Theme"
import { GiCheckMark } from "react-icons/gi"
import { useCallback, useState } from "react"
import { useCreateNewContent } from 'hooks/content/useCreateNewContent'



export const AddingNewPostCard:React.FC = () => {
    const { addNewPost } = useCreateNewContent()
    const [postText, setPostText] = useState('')

    const onChangePostText:React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event) => {
        setPostText(event.target.value)
    }, [])

    const onSavePost = useCallback(() => {
        addNewPost(postText)
        setPostText('')
    }, [postText])


    return (
        <PostCard 
            header={
                <Wrap>
                    <SubTitle text='Add new post'/>
                </Wrap>
            } 
            content={
                <CreatingPostField>
                    <CardImage src={image}/>
                    <TextField 
                        name='postInput'
                        value={postText}
                        onChange={onChangePostText}
                        placeholder="Type smth..."
                        autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                </CreatingPostField>
            } 
            footer={
                <Wrap>
                    <TextIconButton 
                        text='Save post' 
                        icon={<GiCheckMark/>} 
                        color={theme.colors.regularDark} 
                        textSize={"16px"} 
                        iconSize={"20px"} 
                        buttonType={"button"} 
                        fontWeight={600}
                        onClickHandler={onSavePost}
                    />
                </Wrap>
            }
        />
    )
}
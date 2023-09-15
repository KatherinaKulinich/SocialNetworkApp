import { SubTitle } from "@components/text/Subtitle"
import { PostCard } from "../components/PostCard"
import { CreatingPostField, TextField, CardImage, Wrap } from "./AddingNewPostCard.styled"
import image from '@images/newPost.svg'
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton"
import { theme } from "@styles/Theme"
// import { BsSendCheck } from "react-icons/Bs"
import { GiCheckMark } from "react-icons/gi"

export const AddingNewPostCard:React.FC = () => {
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
                        // value={value}
                        // onChange={(e) => setValue(e.target.value)}
                        placeholder="Type smth..."
                        autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                </CreatingPostField>
            } 
            footer={
                <Wrap>
                    <TextIconButton 
                        text='Save post' 
                        // icon={<BsSendCheck/>} 
                        icon={<GiCheckMark/>} 
                        color={theme.colors.regularDark} 
                        textSize={"16px"} 
                        iconSize={"20px"} 
                        buttonType={"button"} 
                        fontWeight={600}
                        // onClickHandler={onChatToUser}
                    />
                </Wrap>
            }
        />
    )
}
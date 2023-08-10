import { theme } from "@styles/Theme";
import { Icon } from "../../icons/Icon";
import { Card, Comments, Content, CardImage, PhotoDescription,  Actions, Action, Text } from "./PhotoCard.styled"
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/Bs'
import { FaRegEdit} from 'react-icons/Fa'
import { RiDeleteBinLine } from 'react-icons/Ri'

interface PhotoCardProps {
    imgPath: string;
    description: string;
    likesSum: number;
    owner: 'me' | 'friend';
}


export const PhotoCard:React.FC<PhotoCardProps> = (
    {imgPath, description, likesSum, owner}) => {
        
    return (
        <Card>
            <CardImage src={imgPath}/>
            <Content>
                { owner === 'me' && (
                    <Actions>
                        <Action>
                            <Icon 
                                icon={<FaRegEdit/>} 
                                iconColor={theme.colors.mediumGray} 
                                iconSize='15px'
                            />
                            <Text>
                                Edit
                            </Text>
                        </Action>
                        <Action>
                            <Icon 
                                icon={<RiDeleteBinLine/>} 
                                iconColor={theme.colors.mediumGray} 
                                iconSize='15px'
                            />
                            <Text>
                                Delete
                            </Text>
                        </Action>
                    </Actions>
                ) }
                <PhotoDescription>
                    {description}
                </PhotoDescription>
                <Actions>
                    <Action>
                        <Icon 
                            icon={<BsSuitHeartFill/>} 
                            iconColor={theme.colors.regular} 
                            iconSize='30px'
                        />
                        <Text>
                            {likesSum}
                        </Text>
                    </Action>
                    <Action>
                        <Comments>
                            Comments
                        </Comments>
                         <Text>
                            0
                        </Text>
                    </Action>
                </Actions>
            </Content>
        </Card>
    )
}
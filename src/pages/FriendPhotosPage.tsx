import { PageImgTitle } from "@components/PageImgTitle/PageImgTitle"
import { PageContainer } from "@components/containers/PageContainer/PageContainer"
import { PhotosContainer } from "@components/containers/PhotosContainer/PhotosContainer"
import { TextIconButton } from "@components/buttons/TextIconButton/TextIconButton";
import { PhotoCard } from '@components/cards/PhotoCard/PhotoCard';
import image from '@images/friendPhotos.svg';
import img1 from '@images/test/1.jpg';
import img2 from '@images/test/2.jpg';
import img3 from '@images/test/3.jpg';
import { theme } from "@styles/Theme";
import { MdDoubleArrow } from 'react-icons/Md';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"




export const FriendPhotosPage:React.FC = () => {
    const navigate = useNavigate();

    const onGoToProfile = useCallback(() => {
        navigate('/myFriends/profile')
    },[])
    return (
        <PageContainer>
            <PageImgTitle 
                image={image} 
                titleFirst="Anna's"
                titleSecond='photos'
            />
            <ButtonBox>
                <TextIconButton 
                    icon={<MdDoubleArrow style={{ transform: 'rotate(180deg)' }} />} 
                    text={"back to Anna's profile"} 
                    color={theme.colors.regularDark} 
                    textSize={'16px'} 
                    iconSize={"30px"} 
                    buttonType={"button"}
                    fontWeight={600}
                    onClickHandler={onGoToProfile}
                />
            </ButtonBox>
            <PhotosContainer>
                <PhotoCard 
                    imgPath={img1} 
                    description='lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala' 
                    likesSum={23}
                    owner="friend"
                />
                <PhotoCard 
                    imgPath={img2} 
                    description='llalalallalallalala' 
                    likesSum={25}
                    owner="friend"
                />
                <PhotoCard 
                    imgPath={img3} 
                    description='lalalalalalalalallalallalala' 
                    likesSum={23}
                    owner="friend"
                />
                <PhotoCard 
                    imgPath={img1} 
                    description='lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala lalalalalalalahhhhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhhhhhh hhhhhhhhhhhhhhh lallalallalala' 
                    likesSum={23}
                    owner="friend"
                />
                <PhotoCard 
                    imgPath={img2} 
                    description='llalalallalallalala' 
                    likesSum={25}
                    owner="friend"
                />
                <PhotoCard 
                    imgPath={img3} 
                    description='lalalalalalalalallalallalala' 
                    likesSum={23}
                    owner="friend"
                />
            </PhotosContainer>
        </PageContainer>
    )
}

const ButtonBox = styled.div`
    align-self: flex-start;
`

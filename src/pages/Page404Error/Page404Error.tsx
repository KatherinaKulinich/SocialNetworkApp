import Image404 from '@images/404.svg'
import { RegularButton } from '@components/buttons/RegularButton/RegularButton';
import { PageContainer } from '@components/containers/PageContainer/PageContainer';
import { Title } from '@components/text/Title';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Image } from './Page404Error.styled';



export const Page404Error:React.FC = () => {
    const navigate = useNavigate();

    const goToHomepage = useCallback(() => {
        navigate('myProfile')
    }, [])

    return (
        <PageContainer> 
            <Container>
                <Image src={Image404}/>
                <Title text={'Sorry, but page not found'}/>
            </Container>
            <RegularButton 
                buttonText='Go to profile'
                buttonType='button' 
                onClickHandler={goToHomepage}
            />
        </PageContainer>
    )
}


    
 
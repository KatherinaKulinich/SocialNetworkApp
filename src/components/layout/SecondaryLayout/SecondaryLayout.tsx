import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Container, MainContent } from './SecondaryLayout.styled';




export const SecondaryLayout:React.FC = () => {

    return (
        <Container>
            <Header isMainLayout={false}/>
            <MainContent>
                <Outlet/>
            </MainContent>
            <Footer role={'secondaryLayout'}/>
        </Container>  
    )
}



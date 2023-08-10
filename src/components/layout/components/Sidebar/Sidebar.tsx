import { UserLogData } from '@components/UserLogData/UserLogData';
import { NavDesktop } from '@components/navigation/NavDesktop/NavDesktop';
import { SecondaryButton } from '@components/buttons/SecondaryButton/SecondaryButton';
import { SidebarSection, Container } from './Sidebar.styled';



export const Sidebar:React.FC = () => {
    return (
        <SidebarSection>
            <Container>
                <UserLogData/>
                <NavDesktop/>
            </Container>
            <SecondaryButton 
                buttonColor='#FFFFFF' 
                buttonText='Log out'
                type='button'
            />
        </SidebarSection>
    )
}
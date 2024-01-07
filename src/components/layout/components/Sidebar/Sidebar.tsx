import { UserLogData } from '@components/UserLogData/UserLogData';
import { NavDesktop } from '@components/navigation/NavDesktop/NavDesktop';
import { SidebarSection, Container } from './Sidebar.styled';
import { useFirebaseAuth } from 'hooks/authorization/useFirebaseAuth';
import { LogOutButton } from '@components/buttons/LogOutButton';




export const Sidebar:React.FC = () => {

    return (
        <SidebarSection>
            <Container>
                <UserLogData/>
                <NavDesktop/>
            </Container>
            <LogOutButton/>
        </SidebarSection>
    )
}
import { UserLogData } from '@components/UserLogData/UserLogData';
import { NavDesktop } from '@components/navigation/NavDesktop/NavDesktop';
import { SidebarSection, Container, ButtonBox } from './Sidebar.styled';
import { LogOutButton } from '@components/buttons/LogOutButton';




export const Sidebar:React.FC = () => {

    return (
        <SidebarSection>
            <Container>
                <UserLogData/>
                <NavDesktop/>
            </Container>
            <ButtonBox>
                <LogOutButton/>
            </ButtonBox>
        </SidebarSection>
    )
}
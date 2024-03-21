import drawerImage from '@images/drawer.svg';
import { UserLogData } from "@components/UserLogData/UserLogData";
import { Link } from "@components/navigation/NavDesktop/NavDesktop.styled";
import { Icon } from "@components/icons/Icon";
import { Created } from "@components/layout/components/Footer/components/Created/Created";
import { Copyright } from "@components/layout/components/Footer/components/Copyright/Copyright";
import { DrawerContainer, SubContainer, LoginContainer, DrawerFooter, Image, Links, GridItem } from "./MainDrawer.styled";
import { navItems, navMobItems } from "utils/data/navigationItems";
import { LogOutButton } from "@components/buttons/LogOutButton";
import { ProfileLink } from '@components/layout/components/Footer/components/ProfileLink/ProfileLink';
import { SwipeableDrawer } from "@mui/material"
import { theme } from "@styles/Theme";

interface MainDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}



export const MainDrawer: React.FC<MainDrawerProps> = ({isOpen, onOpen, onClose}) => {

    const links = navItems.filter((item:any) => !navMobItems.includes(item.value))
    

    return (
        <SwipeableDrawer
            anchor='right'
            open={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            PaperProps={{
                sx: {
                    height: 'calc(100% - 114px)',
                    position: 'absolute',
                    top: 58,
                    bottom: 56,
                    width: '100%',
                    maxWidth: 500,
                    background: `${theme.colors.mediumGray}`,
                },
            }}
        >
            <DrawerContainer>
                <LoginContainer>
                    <UserLogData/>
                    <LogOutButton/>
                </LoginContainer>
                <SubContainer>
                    <Links>
                        {links.map((item) => (
                            <Link 
                                to={`${item.value}`} 
                                onClick={onClose}
                                key={item.value}
                            >
                                {
                                    <Icon 
                                        icon={<item.icon/>}
                                        iconSize="25px"
                                        iconColor="#fff"
                                    />
                                } {item.label}
                            </Link>
                        ))}
                    </Links> 
                </SubContainer>
                <Image src={drawerImage}/>
                <DrawerFooter>
                    <GridItem $columnXS='1/3' $rowXS='2/3' $columnSM='1/2' $rowSM='1/2'>
                        <Copyright/>
                    </GridItem>
                    <GridItem $columnXS='2/3' $rowXS='1/2' $columnSM='2/3' $rowSM='1/2'>
                        <Created/>
                    </GridItem>
                    <GridItem $columnXS='1/2' $rowXS='1/2' $columnSM='3/4' $rowSM='1/2'>
                        <ProfileLink/>
                    </GridItem>
                </DrawerFooter>
            </DrawerContainer>
        </SwipeableDrawer>
    )
}
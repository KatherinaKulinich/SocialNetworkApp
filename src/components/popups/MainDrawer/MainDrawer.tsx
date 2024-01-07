import drawerImage from '@images/drawer.svg';
import { UserLogData } from "@components/UserLogData/UserLogData";
import { Drawer } from "../Drawer"
import { Link } from "@components/navigation/NavDesktop/NavDesktop.styled";
import { Icon } from "@components/icons/Icon";
import { Created } from "@components/layout/components/Footer/components/Created/Created";
import { Copyright } from "@components/layout/components/Footer/components/Copyright/Copyright";
import { DrawerContainer, SubContainer, LoginContainer, DrawerFooter, Image, Links } from "./MainDrawer.styled";
import { navItems, navMobItems } from "utils/data/navigationItems";
import { LogOutButton } from "@components/buttons/LogOutButton";

interface MainDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}



export const MainDrawer: React.FC<MainDrawerProps> = ({isOpen, onOpen, onClose}) => {

    const links = navItems.filter((item:any) => !navMobItems.includes(item.value))
    

    return (
        <Drawer 
            isOpen={isOpen} 
            onOpenDrawer={onOpen} 
            onCloseDrawer={onClose}
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
                    <Copyright/>
                    <Created/>
                </DrawerFooter>
            </DrawerContainer>
        </Drawer>
    )
}
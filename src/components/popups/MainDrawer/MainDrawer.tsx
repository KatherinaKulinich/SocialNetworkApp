// import { RiUserSearchFill } from "react-icons/Ri";
// import { FaGift } from 'react-icons/Fa'
import { UserLogData } from "@components/UserLogData/UserLogData";
import { Drawer } from "../Drawer"
import { Link } from "@components/navigation/NavDesktop/NavDesktop.styled";
import { Icon } from "@components/icons/Icon";
import { Created } from "@components/layout/components/Footer/components/Created/Created";
import { Copyright } from "@components/layout/components/Footer/components/Copyright/Copyright";
import { SecondaryButton } from "@components/buttons/SecondaryButton/SecondaryButton";
import { DrawerContainer, SubContainer, LoginContainer, DrawerFooter, Image, Links } from "./MainDrawer.styled";
import drawerImage from '@images/drawer.svg';
import { navItems } from "utils/navigationItems";

interface MainDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const MainDrawer: React.FC<MainDrawerProps> = ({isOpen, onOpen, onClose}) => {
    const links = navItems.slice(0,1).concat(navItems.slice(6))

    return (
        <Drawer 
            isOpen={isOpen} 
            onOpenDrawer={onOpen} 
            onCloseDrawer={onClose}
        >
            <DrawerContainer>
                <LoginContainer>
                    <UserLogData/>
                    <SecondaryButton 
                        buttonColor='#FFFFFF' 
                        buttonText='Log out'
                        type='button'
                    />
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
                        {/* <Link 
                            to={'search'} 
                            onClick={onClose}
                        >
                            {
                                <Icon 
                                    icon={<RiUserSearchFill/>}
                                    iconSize="25px"
                                    iconColor="#fff"
                                />
                            } User search
                        </Link>
                        <Link 
                            to={'birthdays'} 
                            onClick={onClose}
                        >
                            {
                                <Icon 
                                    icon={<FaGift/>}
                                    iconSize="25px"
                                    iconColor="#fff"
                                />
                            } Birthdays alerts
                        </Link> */}
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
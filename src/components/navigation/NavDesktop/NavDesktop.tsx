import { Icon } from "@components/icons/Icon"
import { RiUserSearchFill, RiUserFill } from 'react-icons/Ri'
import { IoMdImages, IoMdSettings } from 'react-icons/Io'
import { FaUsers, FaGift } from 'react-icons/Fa'
import { BsFillChatDotsFill } from 'react-icons/Bs'
import { Link, NavContainer } from "./NavDesktop.styled"
import { navItems } from "utils/navigationItems";





export const NavDesktop:React.FC = () => {
    return (
        <NavContainer>
            {navItems.map((item) => (
                <Link 
                    to={`${item.value}`} 
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

            {/* <Section>
                <Link to={'search'}>
                    {
                        <Icon 
                            icon={<RiUserSearchFill/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } User search
                </Link>
            </Section>
            <Section>
                <Link to={'myProfile'}>
                    {
                        <Icon 
                            icon={<RiUserFill/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } My profile
                </Link>
                <Link to={'myPhotos'}>
                    {
                        <Icon 
                            icon={<IoMdImages/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } My photos
                </Link>
                <Link to={'myFriends'}>
                    {
                        <Icon 
                            icon={<FaUsers/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } My friends
                </Link>
                <Link to={'myChats'}>
                    {
                        <Icon 
                            icon={<BsFillChatDotsFill/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } My chats
                </Link>
                <Link to={'birthdays'}>
                    {
                        <Icon 
                            icon={<FaGift/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        } Birthdays alerts
                </Link>
            </Section>
            <Section>
                <Link to={'settings'}>
                    {
                        <Icon 
                            icon={<IoMdSettings/>}
                            iconSize="25px"
                            iconColor="#fff"
                        />
                        }  Settings
                </Link>
            </Section> */}
            
        </NavContainer>
    )
}
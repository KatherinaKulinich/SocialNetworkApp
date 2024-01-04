import { Icon } from "@components/icons/Icon"
import { Link, NavContainer } from "./NavDesktop.styled"
import { navItems } from "utils/data/navigationItems";





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
                            iconSize="22px"
                            iconColor="#fff"
                        />
                    } 
                    {item.label}
                </Link>
            ))}
        </NavContainer>
    )
}
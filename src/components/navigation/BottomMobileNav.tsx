import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { theme } from '@styles/Theme';
import styled from 'styled-components';
import { navItems } from "utils/navigationItems";



const Link = styled(NavLink)`
    &.active {
       color: ${theme.colors.regular};
       
       & svg path {
            color: ${theme.colors.regular};      
        }
    }
`



export const BottomMobileNav:React.FC = () => {
    const links = navItems.slice(1, 6);
    const [value, setValue] = React.useState(0);

    const onChangeValue = useCallback((newValue: any) => {
        setValue(newValue);
    }, [])

    return (
        <BottomNavigation
            value={value}
            onChange={onChangeValue}
            sx={{ 
                maxWidth: '100%',
                bgcolor: `${theme.colors.regularDark}`,
                position: 'fixed',
                right:0,
                bottom: 0, 
                left:0,
            }}     
        >
            {links.map((item) => (
                <BottomNavigationAction 
                    sx={{ 
                        color: `#FFFFFF`,
                        ":hover": {
                            color: `${theme.colors.regular}`,
                        },
                        ".Mui-selected, svg": {
                            width: '30px',
                            height: '30px',
                        },
                        // ".Mui-selected, path": {
                        //     width: '50px',
                        //     height: '50px',
                        // }
                    }}
                    // label={item.label}
                    value={item.value}
                    icon={<item.icon/>} 
                    component={Link}
                    to={`/${item.value}`}
                    key={item.value}
                />
            ))}
        </BottomNavigation>
    )
}
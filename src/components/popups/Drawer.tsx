import { SwipeableDrawer } from "@mui/material"
import { theme } from "@styles/Theme";

interface DrawerProps {
    children: React.ReactNode;
    isOpen: boolean;
    onOpenDrawer: () => void;
    onCloseDrawer: () => void;
}

export const Drawer: React.FC<DrawerProps> = (
    {children, onCloseDrawer, onOpenDrawer, isOpen}) => {
    

    return (
        <SwipeableDrawer
            anchor='right'
            open={isOpen}
            onClose={onCloseDrawer}
            onOpen={onOpenDrawer}
            PaperProps={{
                sx: {
                    height: 'calc(100% - 126px)',
                    top: 70,
                    bottom: 56,
                    width: '100%',
                    maxWidth: 500,
                    background: `${theme.colors.mediumGray}`,
                },
            }}
        >
            {children}
        </SwipeableDrawer>
    )
}
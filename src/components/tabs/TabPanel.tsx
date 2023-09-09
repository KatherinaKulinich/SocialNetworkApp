import { Box, Typography } from "@mui/material";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}




export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ width: '100%'}}
        >
            {value === index && (
                <Box sx={{ p: 2,  width: '100%' }}>
                    <Typography component={'div'} sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                        {children}
                    </Typography>
                </Box>
            )}
        </div>
    );
}
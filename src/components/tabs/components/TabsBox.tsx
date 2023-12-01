import { Box, Tabs, Tab, ThemeProvider, createTheme  } from "@mui/material"



interface TabsBoxProps {
    firstTabName:string;
    secondTabName: string;
    tabsValue: number;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF4F5A',
        },
        secondary: {
            main: '#FDBABF',
        },
    },
});




export const TabsBox:React.FC<TabsBoxProps> = (
    {firstTabName, secondTabName, tabsValue, onChange}) => {

    return (
        <Box sx={{ borderBottom: 1, borderColor: '#fee3e5', width: '100%' }}>
            <ThemeProvider theme={theme}>
                <Tabs 
                    value={tabsValue} 
                    onChange={onChange} 
                    centered 
                    textColor="primary"
                    indicatorColor="secondary"
                    variant="fullWidth" 
                >
                    <Tab  
                        label={
                            <span style={{ color: '#FF4F5A'}}>
                                {firstTabName}
                            </span>
                        }
                    />
                    <Tab  
                        label={
                            <span style={{ color: '#FF4F5A' }}>
                                {secondTabName}
                            </span>
                        }
                    />
                </Tabs>
            </ThemeProvider>
        </Box>
    )
}
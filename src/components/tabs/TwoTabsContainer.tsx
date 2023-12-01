import { useState } from "react";
import { TabsBox } from "./components/TabsBox"
import { TabPanel } from "./components/TabPanel";


interface TwoTabsContainerProps {
    firstTabName: string;
    secondTabName: string;
    firstTabContent: React.ReactNode;
    secondTabContent: React.ReactNode;
}



export const TwoTabsContainer:React.FC<TwoTabsContainerProps> = ({firstTabName, secondTabName, firstTabContent, secondTabContent}) => {

    const [value, setValue] = useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    
    return (
        <>
            <TabsBox 
                firstTabName={firstTabName}
                secondTabName={secondTabName}
                onChange={handleChangeTab}
                tabsValue={value}
            />
            <TabPanel 
                value={value} 
                index={0}
            >
                {firstTabContent}
            </TabPanel>
            <TabPanel 
                value={value} 
                index={1}
            >
                {secondTabContent}
            </TabPanel>
        </>
    )
}
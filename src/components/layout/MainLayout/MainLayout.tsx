import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Outlet } from "react-router-dom"
import { BottomMobileNav } from '@components/navigation/BottomMobileNav'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { useCallback, useState } from 'react'
import { MainDrawer } from '@components/popups/MainDrawer/MainDrawer'
import { PageContainer, GridItem, MainContent, MainContentGrid, Content} from './MainLayout.styled'
import { Wrapper } from '../components/Wrapper/Wrapper'




export const MainLayout:React.FC = () => {
    const {width} = useWindowSize();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    const onOpenDrawer = useCallback(() => {
        setIsDrawerOpen(true)
    }, [isDrawerOpen])
    const onCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false)
    }, [isDrawerOpen])





    return (
        <>
            <PageContainer>
                <GridItem $row='1/2'>
                    <Header 
                        isMainLayout={true} 
                        isPopupOpen={isDrawerOpen} 
                        onOpenPopup={onOpenDrawer}
                        onClosePopup={onCloseDrawer}
                    />
                </GridItem>
                
                <MainContent>
                    <Wrapper>
                        <MainContentGrid>
                            {width >= 1024 ? (
                                <>
                                    <GridItem $column='1/2' >
                                        <Sidebar/>
                                    </GridItem>
                                
                                    <GridItem  $column='2/3' >
                                        <Content>
                                            <Outlet/>
                                        </Content>
                                    </GridItem> 
                                </>
                            ) : (
                                <GridItem $column='1/3'>
                                    <Outlet/>   
                                </GridItem>  
                            )}
                        </MainContentGrid>
                    </Wrapper>
                </MainContent>

                {width >= 1024 ? (
                    <GridItem $row='3/4'>
                        <Footer role='mainLayout'/>
                    </GridItem>
                ) : (
                    <GridItem $row='3/4'>
                        <BottomMobileNav/>
                    </GridItem>
                )}
            </PageContainer>
            <MainDrawer 
                isOpen={isDrawerOpen}
                onOpen={onOpenDrawer}
                onClose={onCloseDrawer}
            />
        </>
    )
}
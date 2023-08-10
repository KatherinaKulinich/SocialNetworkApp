import { Page } from "./PageContainer.styled"


interface PageContainerProps {
    children:React.ReactNode
}


export const PageContainer:React.FC<PageContainerProps> = ({children}) => {
    return (
        <Page>
            {children}
        </Page>
    )
}
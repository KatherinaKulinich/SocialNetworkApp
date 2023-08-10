import { List } from "./ListContainer.styled"


interface ListContainerProps {
    children:React.ReactNode
}


export const ListContainer:React.FC<ListContainerProps> = ({children}) => {
    return (
        <List>
            {children}
        </List>
    )
}
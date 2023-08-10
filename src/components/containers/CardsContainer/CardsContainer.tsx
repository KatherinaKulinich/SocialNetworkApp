import { Cards } from "./CardsContainer.styled"


interface CardsContainerProps {
    children:React.ReactNode
}


export const CardsContainer:React.FC<CardsContainerProps> = ({children}) => {
    return (
        <Cards>
            {children}
        </Cards>
    )
}
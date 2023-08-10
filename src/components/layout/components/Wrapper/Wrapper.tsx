import { Wrap } from "./Wrapper.styled"


interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper:React.FC<WrapperProps> = ({children}) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    )
}
import { TypingContainer, TypingDot } from "./TypingAnimation.styled"

export const TypingAnimation:React.FC = () => {
    return (
        <TypingContainer>
            <TypingDot/>
            <TypingDot/>
            <TypingDot/>
        </TypingContainer>
    )
}
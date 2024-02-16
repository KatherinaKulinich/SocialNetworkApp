import { AnimationContainer, AnimationItem } from "./ReactionAnimation.styled"


interface ReactionAnimationProps {
    value: string,
}


export const ReactionAnimation:React.FC<ReactionAnimationProps>= ({value}) => {


    return (
        <AnimationContainer>
            <AnimationItem $x={-100} $y={-200}>{value}</AnimationItem>
            <AnimationItem $x={0} $y={-400}>{value}</AnimationItem>
            <AnimationItem $x={10} $y={-320}>{value}</AnimationItem>
            <AnimationItem $x={220} $y={-250}>{value}</AnimationItem>
            <AnimationItem $x={150} $y={-200}>{value}</AnimationItem>
            <AnimationItem $x={-70} $y={-160}>{value}</AnimationItem>
            <AnimationItem $x={220} $y={-170}>{value}</AnimationItem>
            <AnimationItem $x={120} $y={-250}>{value}</AnimationItem>
            <AnimationItem $x={-40} $y={-320}>{value}</AnimationItem>
            <AnimationItem $x={-30} $y={-140}>{value}</AnimationItem>
        </AnimationContainer>
    )
}
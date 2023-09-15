import { BoxShadow, FlexCenter, Font } from "@styles/mixins"
import { theme } from "@styles/Theme"
import { styled } from "styled-components"

export const UserData = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
export const Date = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: end;
`

export const Text = styled.p`
    ${Font({size: '12px', line: '16px', color: theme.colors.mediumGray})};
`

export const PostTime = styled(Text)`
    font-size: 9px;
`


export const Reactions = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

export const ReactionItem = styled.button<{$items: string}>`
    border-radius: 7px;
    width: 32px;
    height: 32px;
    ${FlexCenter};
    background-color: ${theme.colors.lightGray};
    ${BoxShadow};
    position: relative;
    font-size: 15px;

    &::after {
        position: absolute;
        content: ${(props) => `"${props.$items}"`};
        top: -9px;
        right: -9px;
        ${Font({size: '7px', weight: '600' ,line: '9px', color: theme.colors.white})};
        background-color: ${theme.colors.regular};
        border-radius: 50%;
        ${FlexCenter};
        padding: 4px;
        min-width: 10px;
        min-height: 10px;
    }

    &:hover p {
        font-size: 24px;
    }
    /* &:hover {
        background-color: ${theme.colors.lightRose};
    } */
`

export const CommentsButton = styled(ReactionItem)`
    padding: 12px;
    width: initial;
    ${Font({size: '14px', weight: '600', line: '16px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`
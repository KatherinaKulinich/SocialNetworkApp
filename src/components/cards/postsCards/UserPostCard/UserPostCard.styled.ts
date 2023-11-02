import { BoxShadow, FlexCenter, Font } from "@styles/mixins"
import { theme } from "@styles/Theme"
import { styled } from "styled-components"
import Radio from "antd/lib/radio";

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
export const DateField = styled.div`
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


export const Reactions = styled(Radio.Group)`
    display: flex;
    align-items: center;
    gap: 15px;
`



export const ReactionItem = styled(Radio)<{$items: number}>`
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
        width: 18px;
        height: 18px;
        /* max-width: 22px;
        max-height: 15px; */
    }

    &:hover p {
        font-size: 24px;
    }
    
    &.ant-radio-wrapper {
        border-radius: 8px;
        padding: 4px;
        margin:0;

        & span {
            padding:0;
        }
    }

    &.ant-radio-wrapper-checked {
        padding: 4px;
        border-radius: 8px;
        background-color: ${theme.colors.regularLight};
    }

    & .ant-radio {
        position: absolute;
        left: -9999px;
        overflow: hidden;
    }

    & .ant-radio + * {
        display: block;
        padding: 0;
        overflow: hidden;
        border-radius: 5px;
        overflow: hidden;
    }

`

export const CommentsButton = styled.button<{$items: number}>`
    padding: 12px;
    border-radius: 5px;
    width: initial;
    ${Font({size: '14px', weight: '600', line: '16px', color: theme.colors.regularDark})};
    text-transform: uppercase;
    ${BoxShadow};
    position: relative;

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
`

export const Info = styled.div`
    display: flex;
    align-items: end;
    gap: 12px;
`

export const PostControls = styled.div`
    padding: 10px 0;
    border-top: 1px solid ${theme.colors.lightGray};
    width: 100%;
    justify-content:flex-end;
    display: flex;
    align-items: center;
    gap: 10px;
`
export const ControlButton = styled.button`
    ${Font({size: '11px', weight: '600' ,line: '15px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
    padding: 3px 6px;
    border-radius: 4px;
    background-color: ${theme.colors.lightGray};

    &:hover {
        background-color: ${theme.colors.mediumGray};
        color: ${theme.colors.lightGray};
    }
`

export const PostContent = styled.div`
    padding: 25px 0;
`
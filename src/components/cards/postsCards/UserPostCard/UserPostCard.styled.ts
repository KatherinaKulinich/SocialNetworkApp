import { styled } from "styled-components"
import { BoxShadow, FlexCenter, Font } from "@styles/mixins"
import { theme } from "@styles/Theme"
import { device } from "@styles/Breakpoints";
import Radio from "antd/lib/radio";

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`
export const DateField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: end;
`

export const Text = styled.p`
    ${Font({size: '10px', line: '14px', color: theme.colors.mediumGray})};

    @media ${device.sm} {
        font-size: 12px;
        line-height: 15px;
    };
`

export const PostText = styled.p`
    ${Font({size: '12px', line: '14px', color: theme.colors.textColor})};

    @media ${device.sm} {
        font-size: 14px;
        line-height: 15px;
    };
`

export const PostTime = styled(Text)`
    font-size: 7px;

    @media ${device.sm} {
        font-size: 9px;
    };
`


export const Reactions = styled(Radio.Group)`
    display: flex;
    align-items: center;
    gap: 9px;

    @media ${device.sm} {
        gap: 13px;
    };
    @media ${device.xl} {
        gap: 15px;
    };
`



export const ReactionItem = styled(Radio)<{$items: number}>`
    border-radius: 2px;
    width: 24px;
    height: 24px;
    ${FlexCenter};
    background-color: ${theme.colors.lightGray};
    ${BoxShadow};
    position: relative;
    font-size: 8px;

    @media ${device.sm} {
        width: 28px;
        height: 28px;
        font-size: 10px;
        border-radius: 5px;
    };
    @media ${device.xl} {
        width: 32px;
        height: 32px;
        font-size: 15px;
        border-radius: 7px;
    };

    &::after {
        position: absolute;
        content: ${(props) => `"${props.$items}"`};
        top: -9px;
        right: -9px;
        ${Font({size: '7px', weight: '500' ,line: '9px', color: theme.colors.white})};
        background-color: ${theme.colors.regular};
        border-radius: 50%;
        ${FlexCenter};
        padding: 3px;
        width: 12px;
        height: 12px;

        @media ${device.sm} {
            padding: 3px;
            width: 15px;
            height: 15px;
            font-size: 8px;
        };
        @media ${device.xl} {
            padding: 4px;
            width: 18px;
            height: 18px;
        };
    }

    &:hover p {
        font-size: 14px;

        @media ${device.sm} {
            font-size: 18px;
        };
        @media ${device.xl} {
            font-size: 24px;
        };
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
    padding: 7px;
    border-radius: 5px;
    width: initial;
    ${Font({size: '11px', weight: '600', line: '16px', color: theme.colors.regularDark})};
    text-transform: uppercase;
    ${BoxShadow};
    position: relative;

    @media ${device.sm} {
        padding: 12px;
        font-size: 14px;
    };


    &::after {
        position: absolute;
        content: ${(props) => `"${props.$items}"`};
        top: -9px;
        right: -9px;
        ${Font({size: '7px', weight: '500' ,line: '9px', color: theme.colors.white})};
        background-color: ${theme.colors.regular};
        border-radius: 50%;
        ${FlexCenter};
        padding: 2px;
        min-width: 10px;
        min-height: 10px;

        @media ${device.sm} {
            padding: 3px;
            width: 15px;
            height: 15px;
            font-size: 8px;
        };
        @media ${device.xl} {
            padding: 4px;
            width: 18px;
            height: 18px;
        };
    }
`

export const Info = styled.div`
    display: flex;
    align-items: end;
    gap: 8px;

    @media ${device.sm} {
        gap: 10px;
    }
`

export const PostControls = styled.div`
    padding: 10px 0;
    border-top: 1px solid ${theme.colors.lightGray};
    width: 100%;
    justify-content:flex-end;
    display: flex;
    align-items: center;
    gap: 7px;

    @media ${device.sm} {
        gap: 10px;
    }
`
export const ControlButton = styled.button`
    ${Font({size: '8px', weight: '600' ,line: '13px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
    padding: 3px 6px;
    border-radius: 4px;
    background-color: ${theme.colors.lightGray};

    &:hover {
        background-color: ${theme.colors.mediumGray};
        color: ${theme.colors.lightGray};
    }

    @media ${device.sm} {
        font-size: 11px;
        line-height: 15px;
    }
`

export const PostContent = styled.div`
    padding: 25px 0;
`

export const ReactionBox = styled.div`
    ${FlexCenter};
    width: 24px;
    height: 24px;
    position: relative;
    z-index: 10;

    @media ${device.sm} {
        width: 28px;
        height: 28px;
    };
    @media ${device.xl} {
        width: 32px;
        height: 32px;
    };
`
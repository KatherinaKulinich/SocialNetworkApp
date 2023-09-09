import { styled } from "styled-components";
import { BoxShadow, FlexCenter, Font } from "../../../styles/mixins";
import { theme } from "../../../styles/Theme";
import { device } from "../../../styles/Breakpoints";



export const Card =  styled.div`
    padding: 10px 16px;
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    background-color: ${theme.colors.regular};
    display:flex;
    align-items: center;
    justify-content: space-between;
    ${BoxShadow};
    cursor: pointer;

    @media ${device.lg} {
        padding: 15px 22px;
    };
`


export const DateField = styled.div`
    display:flex;
    align-items: center;
    gap: 15px;

    @media ${device.lg} {
        gap: 30px;
    };
`

export const UserInfo = styled(DateField)`
    gap: 5px;
    max-width: 80px;

    @media ${device.lg} {
        gap: 10px;
        max-width:none;
    };
`

export const BirthdayField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`

export const DateText = styled.p`
    ${Font({size: '14px', weight: '700', line: '16px', color: theme.colors.white})};
    letter-spacing: 1px;

    @media ${device.lg} {
        font-size: 19px;
        line-height: 22px;
    };
`

export const Text = styled.p`
    ${Font({size: '8px', line: '12px', color: theme.colors.white})};
    text-transform: uppercase;

    @media ${device.lg} {
        font-size: 12px;
        line-height: 14px;
    };
`

export const Age = styled.span`
    ${Font({size: '12px', weight: '700', line: '14px', color: theme.colors.regularLight})};
    text-transform: uppercase;
    margin: 0 6px;

    @media ${device.lg} {
        font-size: 17px;
        line-height: 20px;
    };
`


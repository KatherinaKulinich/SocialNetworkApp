import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import { Column, FlexCenter, Font } from "@styles/mixins";

export const Container = styled.div`
    width:100%; 
    ${Column};
    gap: 60px;
`

export const MainInfo = styled.div`
    ${FlexCenter};
    flex-direction:column;
    gap: 30px;

    @media ${device.sm} {
        flex-direction: row;
        gap: 50px;
    };
`


export const Personal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Name = styled.h2`
    ${Font({size: '20px', weight: '600', line: '24px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const Subtitle = styled.p`
    ${Font({size: '14px', weight: '600', line: '17px', color: theme.colors.textColor})};
    text-transform: uppercase;
    display:flex;
    align-items: center;
    gap: 12px;
`

export const RegularText = styled(Subtitle)`
    font-weight: 300;
`

export const Field = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`


export const FullInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 30px;

    @media ${device.md} {
        flex-direction: row;
        gap: 80px;
    };
`

export const AboutField = styled(Personal)`
    gap: 20px;
    align-items: center;
`

export const AboutText = styled(RegularText)`
    max-width: 400px;
`


import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import { Column, FlexCenter, Font } from "@styles/mixins";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width:100%; 
    max-width: 900px;
    ${Column};
    gap: 60px;

    @media ${device.md} {
        gap: 80px;
    };
`

export const MainInfo = styled.div`
    width:100%;
    justify-content: center;
    ${FlexCenter};
    flex-direction:column;
    gap: 30px;

    @media ${device.sm} {
        flex-direction:row;
        gap: 40px;
    };

    @media ${device.md} {
        gap: 50px;
        width:80%;
    };
`


export const Personal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    @media ${device.sm} {
        width: calc(50% - 20px);
    };
    @media ${device.md} {
        width: calc(50% - 40px);
    };
`
export const PersonalMainInfo = styled(Personal)`
    align-items: center;

    @media ${device.sm} {
        align-items: start;
    };
`

export const Name = styled.h2`
    ${Font({size: '24px', weight: '600', line: '27px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const Subtitle = styled.p`
    ${Font({size: '18px', weight: '600', line: '20px', color: theme.colors.textColor})};
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
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media ${device.sm} {
        align-items: start;
        flex-direction: row;
        gap: 40px;
    };

    @media ${device.md} {
        gap: 60px;
        /* width:80%; */
    };
`

export const AboutField = styled(Personal)`
    gap: 20px;
    align-items: center;
`

export const AboutText = styled(RegularText)`
    max-width: 400px;
`




export const InfoContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    @media ${device.sm} {
        align-items: start;
        flex-direction: row;
        justify-content: center;
        gap: 50px;
    };
`

export const Box = styled.div`
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const PreviewContainer = styled(Box)`
    align-items: center;
`


export const PageLink = styled(Link)`
    ${Font({size: '14px', weight: '500', line: '17px', color: theme.colors.regular})};
    text-decoration: none;
`


export const HobbiesList = styled.ul`
    ${Column};
    gap: 8px;
    align-items: start;
`

export const HobbyItem = styled.li`
    list-style-type: none;
    ${Font({size: '14px', weight: '300', line: '16px'})};


    &::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: ${theme.colors.regular};
        display: inline-block;
        margin-right: 7px;
    }
`
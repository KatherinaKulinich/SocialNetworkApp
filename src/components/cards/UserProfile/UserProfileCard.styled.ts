import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import { Column, FlexCenter, Font } from "@styles/mixins";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width:100%; 
    max-width: 900px;
    ${Column};
    gap: 35px;

    @media ${device.md} {
        gap: 80px;
    };
`

export const MainInfo = styled.div`
    width:100%;
    justify-content: center;
    ${FlexCenter};
    flex-direction:column;
    gap: 20px;

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
    gap: 10px;
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
    ${Font({size: '19px', weight: '600', line: '23px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 24px;
        line-height: 27px;
    };
`

export const Subtitle = styled.p`
    ${Font({size: '13px', weight: '600', line: '17px', color: theme.colors.textColor})};
    text-transform: uppercase;
    display:flex;
    align-items: center;

    @media ${device.sm} {
        font-size: 18px;
        line-height: 21px;
    };
`

export const RegularText = styled(Subtitle)`
    font-weight: 300;
`

export const Field = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
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
    gap: 30px;

    @media ${device.sm} {
        align-items: start;
        flex-direction: row;
        justify-content: center;
        gap: 50px;
    };
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media ${device.sm} {
        gap: 15px;
    }
`

export const PreviewContainer = styled(Box)`
    align-items: center;
`


export const PageLink = styled(Link)`
    ${Font({size: '11px', weight: '300', line: '14px', color: theme.colors.regular})};
    text-decoration: none;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    }
`


export const HobbiesList = styled.ul`
    ${Column};
    gap: 8px;
    align-items: start;
`

export const HobbyItem = styled.li`
    list-style-type: none;
    ${Font({size: '11px', weight: '300', line: '14px'})};

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    }


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
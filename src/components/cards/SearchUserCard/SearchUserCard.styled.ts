import { styled } from "styled-components";
import { BoxShadow,Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";



export const UserCard = styled.div`
    padding: 7px 14px;
    display: block;
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .2);
    ${BoxShadow};
    display:flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.lightRose};
    }
    &:active {
        background-color: ${theme.colors.regularLight};
    }

    @media ${device.sm} {
        padding: 10px 20px;
    };
`

export const Flex = styled.div`
    display:flex;
    align-items: center;
    gap: 5px;
`
export const CardContent = styled(Flex)`
    gap: 7px;

    @media ${device.sm} {
        gap: 15px;
    };
    
`
export const UserInfo = styled.div`
    display:flex;
    flex-direction: column;
    gap: 10px;
    max-width: 200px;

    @media ${device.sm} {
        gap: 18px;
    };
`

export const UserAdditionalInfo = styled(UserInfo)`
    gap: 2px;

    @media ${device.sm} {
        gap: 6px;
    };
`

export const UserName = styled.p`
    ${Font({size: '11px', weight: '600', line: '14px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const Text = styled.p`
    ${Font({size: '8px', weight: '300', line: '11px', color: theme.colors.mediumGray})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 10px;
        line-height: 13px;
    };
`
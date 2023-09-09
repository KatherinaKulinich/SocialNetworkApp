import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";


export const FriendsBox = styled.div`
    width: 220px;
    height: 220px;
    display:flex;
    flex-wrap:wrap;
    gap: 3px;
    align-items:center;
    text-align: center;
    background-color: ${theme.colors.lightGray};
    cursor: pointer;
    ${BoxShadow};
`

export const FriendCard = styled.div`
    width: 70px;
    height: 70px;
    /* border-radius: 10px; */
    background-color: white;
    padding: 10px;
    ${Column};
    gap: 7px;
`

export const Name = styled.p`
    ${Font({size: '8px', weight: '400', line: '10px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

// export const Image = styled.img`
//     width: 30px;
//     height: 30px;
// `

export const DefaultImage = styled.div`
    width: 70px;
    height: 70px;
    /* border-radius: 10px; */
    background-color: white;
    ${FlexCenter};
`
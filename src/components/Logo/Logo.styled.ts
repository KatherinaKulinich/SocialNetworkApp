import styled from "styled-components"
import { Font } from "@styles/mixins"
import { theme } from '@styles/Theme'

export const LogoContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 20px;
`

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
`

export const TextMain = styled.p`
    ${Font({size: '10px', line: '14px', weight: '600', color: theme.colors.regularLight})};
    text-transform: uppercase;
`

export const TextSecondary = styled(TextMain)`
    color: #FFFFFF;
`

export const LogoIcon = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 15px;
`
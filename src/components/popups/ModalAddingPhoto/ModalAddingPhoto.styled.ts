import { theme } from "@styles/Theme";
import { Column } from "@styles/mixins";
import { styled } from "styled-components";
import { Form } from "antd";
import { device } from "@styles/Breakpoints";


export const ModalForm = styled(Form)`
    width: 100%;
    padding: 20px;
    ${Column};
    gap: 10px;

    @media ${device.sm} {
        gap: 20px;
        padding: 30px;
    };
`

export const TextField = styled.textarea`
    resize: none;
    width: 100%;
    border: 1px solid ${theme.colors.lightGray};
    min-height: 120px;
    padding: 10px;
    border-radius: 7px;
    
    &::placeholder {
        font-size: 9px;

         @media ${device.sm} {
            font-size: 11px;
        };
    }
`

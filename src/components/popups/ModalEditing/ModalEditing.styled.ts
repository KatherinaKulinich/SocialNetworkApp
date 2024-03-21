import { theme } from "@styles/Theme";
import { Column } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Form } from "antd";



export const Container = styled(Form)`
    width: 100%;
    ${Column};
    gap: 20px;

    @media ${device.sm} {
        gap: 20px;
        padding: 20px;
    };
`


export const TextField = styled.textarea`
    resize: none;
    width: 100%;
    border: 1px solid ${theme.colors.lightGray};
    min-height: 200px;
    padding: 10px;
    border-radius: 7px;
`
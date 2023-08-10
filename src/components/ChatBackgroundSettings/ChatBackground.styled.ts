import { styled } from "styled-components";
import Radio from "antd/lib/radio";
import { Form } from "antd";
import { theme } from "@styles/Theme";
import { Column, FlexCenter, Size } from "@styles/mixins";




export const Container = styled.div`
    width: 100%;
    ${Column};
    gap: 30px;
`


export const Background = styled.div<{$url: string}>`
    ${Size({w: '130px'})};
    background-image: url(${props => props.$url});
    background-size: cover;
    background-position: center;
`


export const RadioItem = styled(Radio)`
    font-size: 0;
    
    &.ant-radio-wrapper {
        border: 3px solid #ccc;
        border-radius: 8px;
        padding: 4px;
        margin:0;

        & span {
            padding:0;
        }
    }

    &.ant-radio-wrapper-checked {
        padding: 4px;
        border: 3px solid ${theme.colors.regular};
        border-radius: 8px;
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

export const Group = styled(Radio.Group)`
    width: 100%;
    max-width: 600px;
    ${FlexCenter};
    flex-wrap: wrap;
    gap: 10px;
`

export const BackgroundForm = styled(Form)`
    ${Column};
    gap: 15px;

    &.ant-form label {
        font-size:0;
    }


`
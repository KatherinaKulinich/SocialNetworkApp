import styled from "styled-components"
import { Image } from 'antd';
import { Paragraph } from "@components/text/Paragraph";
import { theme } from "@styles/Theme"
import { useEffect } from "react";


interface DrawerFileContainerProps {
    files: Array<string>,
}

export const DrawerFileContainer:React.FC<DrawerFileContainerProps> = ({files}) => {

    return (
        <Container>
            <Image.PreviewGroup>
                {files?.length > 0 ? (
                    files.map((file:string, index:number) => (
                        <Image 
                            src={file} 
                            key={index} 
                            width={110} 
                            height={110}
                        />
                    ))
                ) : (
                    <Paragraph 
                        text='No files yet' 
                        color={theme.colors.mediumGray}
                    />
                )}
            </Image.PreviewGroup>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    gap: 7px;
    /* justify-content: center; */
    /* justify-content: space-between; */
    align-items: center;
`


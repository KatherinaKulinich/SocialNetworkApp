import { SubTitle } from "@components/text/Subtitle";
import { Container } from "./ProfileEditing.styled";
import { EditingForm } from "./components/EditingForm"




interface ProfileEditingProps {
    buttonText: string;
    title: string;
}

export const ProfileEditing:React.FC<ProfileEditingProps> = ({buttonText, title}) => {
    
    return (
        <Container>
            <SubTitle text={title}/> 
            <EditingForm buttonText={buttonText}/>
        </Container>
    )
}
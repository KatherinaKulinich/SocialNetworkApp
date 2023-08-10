
import { Container, FormTitle } from "./ProfileEditing.styled";
import { EditingForm } from "./components/EditingForm"




interface ProfileEditingProps {
    buttonText: string;
    title: string;
}

export const ProfileEditing:React.FC<ProfileEditingProps> = ({buttonText, title}) => {
    

    return (
        <Container>
            <FormTitle>
                {title}
            </FormTitle>
            <EditingForm buttonText={buttonText}/>
        </Container>
    )
}
import blob1 from '../../../../../assets/images/blob1.svg';
import blob2 from '../../../../../assets/images/blob2.svg';
import blob3 from '../../../../../assets/images/blob3.svg';
import blob4 from '../../../../../assets/images/blob4.svg';
import { Image } from 'antd';
import { AvatarBox, Avatar, Blob } from './ProfileAvatar.styled';

interface ProfileAvatarProps {
    userAvatarImg: string;
}

export const ProfileAvatar:React.FC<ProfileAvatarProps> = ({userAvatarImg}) => {
    return (
        <AvatarBox>
            <Blob src={blob1}/>
            <Blob src={blob3}/>
            <Blob src={blob2}/>
            <Blob src={blob4}/>

            <Avatar>
                <Image 
                    width={160} 
                    src={userAvatarImg} 
                />
            </Avatar>      
        </AvatarBox>
    )
}
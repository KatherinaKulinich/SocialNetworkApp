import avatar1 from '@images/avatars/1.png';
import avatar2 from '@images/avatars/2.png';
import avatar3 from '@images/avatars/3.png';
import avatar4 from '@images/avatars/4.png';
import avatar5 from '@images/avatars/5.png';
import avatar6 from '@images/avatars/6.png';
import avatar7 from '@images/avatars/7.png';
import avatar8 from '@images/avatars/8.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8]



export const getRandomAvatar = () => {
    let randomNumber = Math.floor(Math.random() * 7) + 1;
    return avatars[randomNumber]
}
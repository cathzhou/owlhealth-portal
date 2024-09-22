import "./userinfo.css"
import {
    IconMessageCircle,
    IconDots,
    IconUserCircle,
    IconCoin,
    IconFingerprint,
    IconNotification,
  } from '@tabler/icons-react';
import {useAuthState} from 'react-firebase-hooks/auth'
import { messagedatabase, auth } from '../../../firebase.config';

const Userinfo = () => {
    const [user] = useAuthState(auth);
    const profileName = user?.displayName
    return (
        <div className='userInfo'>
            <div className="user">
                <img src="src/img/useravatar.png" className="userIcon"/>
                <p>{profileName}</p>
            </div>
            <div className="icons">
                <IconMessageCircle />
                <IconDots />
            </div>
        </div>
    )
}

export default Userinfo
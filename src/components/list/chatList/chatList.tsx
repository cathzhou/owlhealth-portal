import "./chatList.css";
import { useState } from 'react';
import {
    IconSearch,
    IconPlus,
    IconMinus,
    IconFingerprint,
    IconNotification,
} from '@tabler/icons-react';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <IconSearch />
                    <input type="text" placeholder="Search" />
                </div>
                {addMode ? (
                    <IconPlus className="add" onClick={() => setAddMode((prev) => !prev)} />
                ) : (
                    <IconMinus className="add" onClick={() => setAddMode((prev) => !prev)} />
                )}
            </div>
            <div className="item">
                <img src="src/img/doctoravatar.png" alt="Doctor Avatar" className="user-icon" />
                <div className="texts">
                    <span>Dr. Shan</span>
                    <p>Do you have a headache?</p>
                </div>
            </div>
            <div className="item">
                <img src="src/img/doctoravatar1.png" alt="Doctor Avatar" className="user-icon" />
                <div className="texts">
                    <span>Dr. Castro</span>
                    <p>Let me know when you're available.</p>
                </div>
            </div>
            <div className="item">
                <img src="src/img/doctoravatar2.png" alt="Doctor Avatar" className="user-icon" />
                <div className="texts">
                    <span>Dr. Peters</span>
                    <p>Thanks for clarifying!</p>
                </div>
            </div>
            <div className="item">
                <img src="src/img/doctoravatar3.png" alt="Doctor Avatar" className="user-icon" />
                <div className="texts">
                    <span>Dr. McKelvey</span>
                    <p>Hope you feel better!</p>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
import "./chat.css";
import {
  IconPhone,
  IconVideo,
  IconInfoCircle,
} from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { messagedatabase, auth } from '../../firebase.config';

// Define an interface for the message object
interface Message {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
}

const Chat = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(messagedatabase, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id } as Message);
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    await addDoc(collection(messagedatabase, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      uid: user?.uid,
      displayName: user?.displayName,
    });

    setNewMessage('');
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
        <img src="src/img/doctoravatar.png" alt="User Avatar" className="user-icon" />
          <div className="texts">
            <span>Dr. Trotter</span>
            <p>Certified provider</p>
          </div>
        </div>
        <div className="icons">
          <IconPhone />
          <IconVideo />
          <IconInfoCircle />
        </div>
      </div>
      <div className="center">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.uid === user?.uid ? 'sent' : 'received'}`}>
              <p>{message.displayName}: {message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
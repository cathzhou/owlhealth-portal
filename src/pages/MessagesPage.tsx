import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { messagedatabase, auth } from '../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

// Define an interface for the message object
interface Message {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
}

const MessagesPage = () => {
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
    <div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.uid === user?.uid ? 'sent' : 'received'}`}>
            <p>{message.displayName}: {message.text}</p>
          </div>
        ))}
      </div>
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
  );
};

export default MessagesPage;
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { messagedatabase, auth } from '../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import './MessagesPage.css'
import Chat from "../components/chat/Chat";
import Detail from "../components/detail/Detail";
import List from "../components/list/List";



const MessagesPanel: React.FC = () => {

  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />
    </div>
  )
}

export default MessagesPanel
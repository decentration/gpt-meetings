import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import NewSystemMessageForm from './components/NewSystemMessageForm';
import MainViewer from './components/MainViewer';
import CreateInstance from './components/CreateInstance';
import CreateConversation from './components/CreateConversation';
import Instances from './components/Instances';
// import MemoryStream from './pages/MemoryStream';
import { Instance } from './types';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [conversationList, setConversationList] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [conversationHistory, setConversationHistory] = useState(null);
  const [instances, setInstances] = useState<Instance[]>([]);


  const fetchConversations = async () => {
    try {
      const response = await fetch('http://localhost:3008/api/conversations');
      const conversationFiles = await response.json();
      setConversationList(conversationFiles);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    async function fetchInstances() {
      try {
        const response = await fetch('http://localhost:3008/api/instances');
        const fetchedInstances = await response.json();
        setInstances(fetchedInstances.flat());
        console.log(fetchedInstances.flat())
      } catch (error) {
        console.error('Error fetching instances:', error);
      }
    }

    fetchInstances();
  }, []);
  
  useEffect(() => {
    const newSocket = io('http://localhost:3008');
    setSocket(newSocket);

    newSocket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen to the newConversation event to update the conversation list.
    newSocket.on('newConversation', (conversation: any) => {
      setConversationList((prevList) => [...prevList, conversation]);
    });

    newSocket.on('conversationHistory', (history: any[]) => {
      setConversationList(history);
    });

    newSocket.emit('requestConversationHistory');

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  
  return (
    <div className="App">
      <CreateInstance instances={instances} setInstances={setInstances} />
       <Router>
      <nav>
        <Link className="bg-white text-gray-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600" to="/instances">Instances</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/instances" 
            element={<Instances instances={instances} />}
           />
            {/* <Route path="/memory-stream" element={<MemoryStream />} /> */}
        </Routes>     
        </div>
    </Router>
     
      
    <CreateConversation instances={instances} />
      <Sidebar
        conversationList={conversationList}
        setActiveConversation={setActiveConversation}
      />
      {activeConversation && (
        <MainViewer activeConversation={activeConversation} />
      )}
      {/* <NewSystemMessageForm
        socket={socket}
        setConversationList={setConversationList}
      /> */}
       
    </div>
  );
};

export default App;

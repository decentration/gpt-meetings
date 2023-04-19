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
import Navbar from './components/Navbar';


const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [conversationList, setConversationList] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [conversationHistory, setConversationHistory] = useState(null);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <div className={`sidebar w-full lg:w-64 bg-gray-100 p-4 ${showSidebar ? 'block' : 'hidden'}`}>
        <Sidebar
          conversationList={conversationList}
          setActiveConversation={setActiveConversation}
        />
      </div>
      <div className="main-content flex-grow">
        <nav className="bg-white shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Subchorus</h1>
            <button onClick={toggleSidebar} className="block lg:hidden">
              {/* No svg icon here */}
            </button>
          </div>
        </nav>
        <CreateInstance instances={instances} setInstances={setInstances} />
        <CreateConversation instances={instances} />
        <Router>
          <nav>
            <Link className="bg-white text-gray-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600" to="/instances">Instances</Link>
          </nav>
          <div>
            <Routes>
              <Route path="/instances" element={<Instances instances={instances} />} />
              {/* <Route path="/memory-stream" element={<MemoryStream />} /> */}
            </Routes>
          </div>
        </Router>
      </div>
      <div className="menu-icon lg:hidden fixed right-4 bottom-4 z-10">
        <button onClick={toggleSidebar} className="bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition duration-300 ease-in-out">
          {/* No svg icon here */}
        </button>
      </div>
    </div>
  );
  
  
  
  
};


export default App;

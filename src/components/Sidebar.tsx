import React, { useState } from 'react';

interface SidebarProps {
  conversationList: any[];
  setActiveConversation: (conversation: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversationList,
  setActiveConversation,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <div className={`sidebar w-full lg:w-64 bg-gray-100 p-4 ${showSidebar ? 'block' : 'hidden'}`}>
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        <ul className="space-y-2">
          {conversationList.map((conversation, index) => (
            <li
              key={index}
              className={`w-full text-left p-2 ${
                index === activeIndex ? 'bg-blue-200' : ''
              }`}
              onClick={() => {
                setActiveIndex(index);
                setActiveConversation(conversationList[index]);
              }}
            >
              Conversation {index + 1}
            </li>
          ))}
        </ul>
      </div>
      {/* Main content */}
      <div className="menu-icon lg:hidden fixed right-4 bottom-4 z-10">
        <button onClick={toggleSidebar} className="bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition duration-300 ease-in-out">
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

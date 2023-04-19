import React, { useState } from 'react';
import Navbar from './Navbar';

interface SidebarProps {
  conversationList: any[];
  setActiveConversation: (conversation: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversationList,
  setActiveConversation,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="sidebar w-64 bg-gray-100 p-4">
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
  );
};

export default Sidebar;

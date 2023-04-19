import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface NewConversationFormProps {
  socket: Socket | null;
  setConversationList: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

interface Conversation {
  id: string;
  message: string;
  // add other properties here as needed
}

const NewConversationForm: React.FC<NewConversationFormProps> = ({
  socket,
  setConversationList,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && input.trim()) {
      socket.emit('newConversation', input, (conversation: Conversation) => {
        setConversationList((prevList) => {
            return [...prevList, conversation];
          });
      });
      setInput('');
    }
  };

  return (
    <div className="newConversationForm fixed bottom-0 left-0 bg-white p-4">
      <h2 className="text-lg font-semibold mb-2">Create New System Message</h2>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-grow border border-gray-300 p-2 mr-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Conversation
        </button>
      </form>
    </div>
  );
};

export default NewConversationForm;

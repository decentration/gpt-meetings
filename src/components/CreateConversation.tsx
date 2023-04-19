import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Instance } from '../types';
import axios from 'axios';

interface CreateConversationProps {
    instances: Instance[];
  }

const CreateConversation: React.FC<CreateConversationProps> = ({ instances }) => {
    const [instance1Id, setInstance1Id] = useState<string | null>(null);
    const [instance2Id, setInstance2Id] = useState<string | null>(null);
    
    const [isOpen, setIsOpen] = useState(false);
    // const [instances, setInstances] = useState<Instance[]>([]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleInstance1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstance1Id(e.target.value || null);
      };
      
      const handleInstance2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstance2Id(e.target.value || null);
      };
      
      

    const handleCreateConversationClick = async () => {
        if (!instance1Id || !instance2Id) {
          alert('Please select two instances before creating a conversation');
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:3008/api/conversations', {
            instance1_id: instance1Id,
            instance2_id: instance2Id,
          });
    
          if (response.status === 201) {
            alert('Conversation created successfully');
            console.log('Created conversation:', response.data);
          } else {
            alert('Failed to create conversation');
          }
        } catch (error) {
          console.error('Error creating conversation:', error);
          alert('Failed to create conversation');
        }
    };
    

  return (
    <div>
       <button
          onClick={openModal}
          className="bg-white text-indigo-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out flex items-center justify-center min-w-[175px] mt-1"
        >
          <span className="mr-2">Create Meeting + </span>
          
        </button>
      <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-10">
        <div className="mt-8 p-4 bg-white w-full mx-auto max-w-md rounded-lg">
          <Dialog.Title as="h2" className="text-xl font-semibold">
            Create Conversation
          </Dialog.Title>
      
          <label htmlFor="instance1">Instance 1:</label>
            <select
            id="instance1"
            value={instance1Id || ""}
            onChange={(e) => setInstance1Id(e.target.value)}
            >
            <option value="">Select an instance</option>
            {instances.map((instance) => (
                <option key={instance.id} value={instance.id}>
                {instance.name}
            </option>
        ))}
        </select>
        <br />
        <label htmlFor="instance2">Instance 2:</label>
        <select
        id="instance2"
        value={instance2Id || ""}
        onChange={(e) => setInstance2Id(e.target.value)}
        >
        <option value="">Select an instance</option>
        {instances.map((instance) => (
            <option key={instance.id} value={instance.id}>
            {instance.name}
            </option>
        ))}
        </select>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={handleCreateConversationClick}>Start</button><br></br>
      <button onClick={() => closeModal()}>Close</button>

      </div>
      </Dialog>
    </div>
 
  );
};

export default CreateConversation;

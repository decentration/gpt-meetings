import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import '../globalStyles.module.css';
import { Instance } from '../types';


interface CreateInstanceProps {
  instances: Instance[];
  setInstances: React.Dispatch<React.SetStateAction<Instance[]>>;
}

const CreateInstance: React.FC<CreateInstanceProps> = ({ instances, setInstances }) => {
  const [instanceName, setInstanceName] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchInstances() {
      try {
        const response = await fetch('http://localhost:3008/api/instances');
        const fetchedInstances = await response.json();
        setInstances(fetchedInstances);
      } catch (error) {
        console.error('Error fetching instances:', error);
      }
    }

    fetchInstances();
  }, []);

  async function createInstanceWithSystemMessages(instanceName: string, systemMessage: string): Promise<string> {
    console.log("Sending data to server:", instanceName, systemMessage); 
    const response = await fetch("http://localhost:3008/api/instances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instance_name: instanceName,
        system_message: systemMessage, // Join all system messages into a single string
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData.id;
  }

  const handleCreateInstanceClick = async () => {
    try {
      const instanceId = await createInstanceWithSystemMessages(instanceName, systemMessage); // Update this line
  
      console.log("Instance created with ID:", instanceId);
  
      // Add the new instance to the instances list
      setInstances((prevInstances) => [
        ...prevInstances,
        { id: instanceId, name: instanceName, system_message: systemMessage},
      ]);
  
      // Clear the input fields
      setInstanceName('');
      setSystemMessage('');
    } catch (error) {
      console.error("Error creating instance:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-white text-indigo-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out flex items-center justify-center min-w-[175px]"
      >
        <span className="mr-2">Create Agent + </span>
      </button>

      <Dialog open={modalIsOpen} onClose={() => setModalIsOpen(false)} className="fixed inset-0 z-10">
        <div className="mt-8 p-4 bg-white w-full mx-auto max-w-md rounded-lg">
          <Dialog.Title as="h2" className="text-xl font-semibold">
            Create Instance
          </Dialog.Title>
          <label htmlFor="instanceName" className="block text-gray-700 font-bold mb-2">
            Instance Name:
          </label>
          <input
            type="text"
            id="instanceName"
            value={instanceName}
            onChange={(e) => setInstanceName(e.target.value


)}
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>
<br />
<label htmlFor="systemMessage" className="block text-gray-700 font-bold mb-2">
System Message:
</label>
<input
type="text"
id="systemMessage"
value={systemMessage}
onChange={(e) => setSystemMessage(e.target.value)}
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
/>
<br />
<button
onClick={handleCreateInstanceClick}
className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
>
Create Instance
</button>

<h2>Existing Instances</h2>
<ul>
{instances.map((instance) => (
  <li key={instance.id}>{instance.name}</li>
))}
</ul>
<button onClick={() => setModalIsOpen(false)}>Close</button>
</div>
</Dialog>
</>
);
};

export default CreateInstance;
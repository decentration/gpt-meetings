import React from 'react';

interface MainViewerProps {
  activeConversation: any;
}

const getColorForInstanceId = (instance_id: string) => {
  const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];

  if (!instance_id) {
    return colors[0]; // Return a default color if instance_id is undefined
  }

  const colorIndex = instance_id.charCodeAt(0) % colors.length;
  return colors[colorIndex];
};

const getMessageStyle = (instance_name: string) => {
  return {
    backgroundColor: getColorForInstanceId(instance_name),
    color: '#333',
    borderRadius: instance_name === 'Samantha' ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
    padding: '8px 12px',
    display: 'inline-block',
    maxWidth: '70%'
  };
};



const MainViewer: React.FC<MainViewerProps> = ({ activeConversation }) => {
  return (
    <div className="mainViewer bg-white p-4">
      {activeConversation ? (
        <>
          <h2 className="text-lg font-semibold mb-4">
            Conversation: {activeConversation.conversation_name}
          </h2>
          <h3 className="text-md font-semibold mb-2">System Messages</h3>
          <ul className="space-y-2 mb-4">
            {activeConversation.system_messages &&
              activeConversation.system_messages
                .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((message: any, index: number) => (
                  <li key={index} className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
                    <div style={getMessageStyle(message.instance_name)}>
                      {message.instance_name || "User"}: {message.content}

                    </div>
                  </li>
                ))}
          </ul>
          <h3 className="text-md font-semibold mb-2">Messages</h3>
          <ul className="space-y-2">
            {activeConversation.messages &&
              activeConversation.messages
                .filter((message: any) => message.role !== 'system') // Filter out system messages
                .sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((message: any, index: number) => (
                  <li key={index} className="bg-gray-100 p-2 rounded">
                    <div className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
                    <div style={getMessageStyle(message.instance_name)}>
                      {message.instance_name || "User"}: {message.content}

                    </div>
                  </li>
                ))}
          </ul>
        </>
      ) : (
        <p>No conversation selected</p>
      )}
    </div>
  );
};

export default MainViewer;

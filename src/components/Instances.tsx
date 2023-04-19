import React, { useState, useEffect } from 'react';
import { Instance } from '../types';

interface InstancesProps {
    instances: Instance[];
  }

  const Instances: React.FC<InstancesProps> = ({ instances }) => {

  return (
    <div>
      <h2>Instances</h2>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">System Message</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id}>
              <td className="border">{instance.name}</td>
              <td className="border">{instance.system_message}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default Instances;

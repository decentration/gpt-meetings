// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Subchorus</h1>
        {/* Add your buttons here */}
        <Link className="bg-white text-gray-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600 mr-2" to="/instances">GPT Agents</Link>
        <Link className="bg-white text-gray-600 font-bold px-3 py-2 rounded border-solid border-2 border-indigo-600" to="/another-page">Another Page</Link>
        <button onClick={toggleSidebar} className="block lg:hidden ml-2">
          {/* No svg icon here */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

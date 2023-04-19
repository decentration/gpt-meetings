import React from 'react';
import { Link } from 'react-router-dom';
import CreateConversation from './CreateConversation';
import CreateInstance from './CreateInstance';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <span className="font-semibold text-xl tracking-tight">React Chat App</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-500 hover:border-gray-500">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
            Home
          </Link>
          <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
            About
          </Link>
          <div className="relative inline-block">
            <button className="bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">Create</span>
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 18a1 1 0 01-1-1v-4H6a1 1 0 01-.707-1.707l8-8a1 1 0 011.414 0l8 8A1 1 0 0114 13h-4v4a1 1 0 01-1 1z"/></svg>
            </button>
            <div className="dropdown-menu absolute hidden bg-gray-900 text-gray-300 pt-1">
              <CreateConversation instances={[]} />
              <CreateInstance instances={[]} setInstances={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

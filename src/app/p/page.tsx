"use client"

import React, { useState } from 'react';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-0 flex-1 flex overflow-hidden">
      <button
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onMouseEnter={() => setShowSidebar(true)}
        onMouseLeave={() => setShowSidebar(false)}
        style={{ transition: 'background-color 1s' }} // Added CSS transition
      >
        show
      </button>
      {showSidebar && (
        <nav
          aria-label="Sidebar"
          className="sm:block lg:block h-screen flex-shrink-0 bg-gray-800 overflow-y-auto"
          style={{ transition: 'transform 1s' }} // Added CSS transition
        >
          <div className="relative w-64 flex space-y-16 flex-col p-3">
            <a href="#" className="text-gray-400 hover:text-red-700">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                {/* <i className="fa fa-house"></i> */}
              </div>
              <div className="text-center text-xs font-normal">Home</div>
            </a>

            <a href="#" className="text-gray-400 hover:text-red-700">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                {/* <i className="fa fa-cog"></i> */}
              </div>
              <div className="text-center text-xs font-normal">Settings</div>
            </a>

            <a href="#" className="text-gray-400 hover:text-red-700">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
                {/* <i className="fa fa-envelope"></i> */}
              </div>
              <div className="text-center text-xs font-normal">Messages</div>
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}

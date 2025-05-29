import React, { useState } from 'react';
import OverView from './OverView';
import CommentSystem from './CommentSystem';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="max-w-full  mt-10 ">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab('tab1')}
          className={`px-6 py-2 text-sm font-medium ${
            activeTab === 'tab1'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={`px-6 py-2 text-sm font-medium ${
            activeTab === 'tab2'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          Comments 
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'tab1' && (
          <div>
            <OverView />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <CommentSystem />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;


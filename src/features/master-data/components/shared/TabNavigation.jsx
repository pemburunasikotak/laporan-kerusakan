import React from 'react';

/**
 * Reusable TabNavigation component
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects [{id, name, icon}]
 * @param {String} props.activeTab - Currently active tab id
 * @param {Function} props.onChange - Callback when tab changed
 */
const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-2 mb-6 border-b">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {Icon && <Icon size={20} />}
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;

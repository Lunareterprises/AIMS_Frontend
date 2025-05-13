export default function TabContainer({ selectedTab, setSelectedTab, tabs }) {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`mr-6 py-2 text-sm font-medium ${
            selectedTab === tab.key
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-500'
          }`}
          onClick={() => setSelectedTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

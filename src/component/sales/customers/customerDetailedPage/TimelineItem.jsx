import React, { useState, useEffect } from 'react';

// Sample JSON data structure - in a real app, this would be loaded from an external file
const timelineData = [
  {
    date: "21/03/2024",
    time: "13:42:40",
    status: "updated",
    title: "Notified of claim ABCD-001-A as normal ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:41:20",
    status: "updated",
    title: "Pre-loaded Scheduled modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:40:54",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:40:48",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:40:17",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:40:03",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:39:52",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:39:35",
    status: "updated",
    title: "Pre-loaded modation modation for Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:38:42",
    status: "added",
    title: "Autos Claim ABCD-001-A as normal ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:37:53",
    status: "updated",
    title: "Autos Claim ABCD-001-A as normal ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:37:43",
    status: "updated",
    title: "Autos Claim referred to Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:37:26",
    status: "updated",
    title: "Autos Claim ABCD-001-A as normal ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:37:08",
    status: "updated",
    title: "Autos Claim ABCD-001-A as normal ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:36:57",
    status: "added",
    title: "Autos Claim ABCD-001-A selected",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:36:43",
    status: "updated",
    title: "Autos Claim referred to for Autos",
    details: "via Comments - Auto Status"
  },
  {
    date: "21/03/2024",
    time: "13:36:30",
    status: "updated",
    title: "Autos Claim referred to Autos Claim ABCD-001-A",
    details: "via Comments - Auto Status"
  }
];

const TimelineItem = ({ item, isLast }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'updated':
        return 'text-orange-500';
      case 'added':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getBulletColor = (status) => {
    switch (status.toLowerCase()) {
      case 'updated':
        return 'bg-orange-500';
      case 'added':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3 pb-4">
      {/* Date and Time Column */}
      <div className="flex-shrink-0 w-20 text-right">
        <div className="text-xs text-gray-600 font-medium">{item.date}</div>
        <div className="text-xs text-gray-500">{item.time}</div>
      </div>

      {/* Timeline Line and Bullet */}
      <div className="flex flex-col items-center">
        <div className={`w-2 h-2 rounded-full ${getBulletColor(item.status)} mt-1`}></div>
        {!isLast && <div className="w-px h-16 bg-gray-300 mt-1"></div>}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
              Status change: {item.status}
            </span>
          </div>
          <div className="text-sm text-gray-800 mb-1">
            {item.title}
          </div>
          <div className="text-xs text-blue-600">
            {item.details}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading data from external JSON file
  useEffect(() => {
    // In a real application, you would fetch from an external JSON file like this:
    // fetch('/path/to/timeline-data.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     setData(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error loading timeline data:', error);
    //     setLoading(false);
    //   });

    // For demo purposes, we'll simulate loading with a timeout
    setTimeout(() => {
      setData(timelineData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4">
        <div className="">
          
          <div className="space-y-0">
            {data.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                isLast={index === data.length - 1}
              />
            ))}
          </div>
        </div>

        
          
      </div>
    </div>
  );
};

export default Timeline;
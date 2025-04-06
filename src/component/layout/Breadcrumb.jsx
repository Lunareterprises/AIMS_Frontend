// src/components/layout/Breadcrumb.jsx
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <div className="text-sm text-gray-500 px-4 py-2">
      <span className="text-gray-400">Dashboard</span>{" "}
      {paths.length === 0 ? (
        <span>Home</span>
      ) : (
        paths.map((p, i) => (
          <span key={i}>
            {" / "}
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </span>
        ))
      )}
    </div>
  );
};

export default Breadcrumb;

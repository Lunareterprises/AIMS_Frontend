
import { useState } from "react";
import {
  ChevronRight,
  BanknoteX,
  ChevronDown,
  BarChart2,
  Map,
  Paintbrush,
  Diamond,
  ShoppingCart,
  Calendar,
  FileText,
  Library,
  Github,
  Package,
  Box,
  Layers,
  Tag,
  ArchiveRestore,
  Folders,
  Users,
  Truck,
  ClipboardList,
  Receipt,
  DollarSign,
  Repeat,
  RotateCcw,
  FileMinus,
  UserCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleTheme = () => setDarkMode(!darkMode);

  const baseClasses = darkMode
    ? "bg-slate-900 text-white"
    : "bg-white text-slate-800";

  return (
    <div className="flex h-screen text-base">
      <div
        className={`${baseClasses} ${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-300 flex flex-col border-r shadow-sm`}
      >
        <div
          className="p-4 flex items-center justify-between text-sm"
          onClick={toggleSidebar}
        >
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-1 rounded">
              <span className="font-bold">Z</span>
            </div>
            {!collapsed && (
              <span className="ml-2 font-semibold text-blue-500">zeluna</span>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto whitespace-nowrap">
          {!collapsed && (
            <div className="px-4 py-2 text-xs uppercase tracking-wider text-slate-500">
              General
            </div>
          )}

          <NavItem
            
            icon={<BarChart2 size={20} />}
            label="Home"
            collapsed={collapsed}
            to="/home"
          />
          <NavItem
            
            icon={<BanknoteX size={20} />}
            label="Banking"
            collapsed={collapsed}
            to="/banking"
          />
          <NavItem
            icon={<Package size={20} />}
            label="Product"
            collapsed={collapsed}
            notification={true}
            children={[
              {
                icon: <Box size={16} />,
                label: "Items",
                to: "/ItemList",
              },
              {
                icon: <Layers size={16} />,
                label: "Composite Items",
                to: "/Compositeitemlist",
              },
              {
                icon: <Folders size={16} />,
                label: "Items Groups",
                to: "/ItemsGroupList",
              },
              {
                icon: <Tag size={16} />,
                label: "Price Lists",
                to: "/PriceList",
              },
              {
                icon: <ArchiveRestore size={16} />,
                label: "Inventory Adjustments",
                to: "/Inventory_AdjustmentList",
              },
            ]}
          />

          <NavItem
            icon={<Map size={20} />}
            label="Sales"
            collapsed={collapsed}
            children={[
              {
                icon: <Users size={18} />,
                label: "Customers",
                to: "/CustomersList",
              },
              {
                icon: <FileText size={18} />,
                label: "Quotes",
                to: "/Addqoutes",
              },
              {
                icon: <Package size={18} />,
                label: "Packages",
              },
              {
                icon: <Truck size={18} />,
                label: "Shipments",
              },
              {
                icon: <ClipboardList size={18} />,
                label: "Delivery Challans",
              },
              {
                icon: <Receipt size={18} />,
                label: "Invoices",
                to:"/invoicesLayout"
              },
              {
                icon: <DollarSign size={18} />,
                label: "Payment Received",
                to:"/payemntReceived"
              },
              {
                icon: <Repeat size={18} />,
                label: "Recurring Invoices",
              },
              {
                icon: <RotateCcw size={18} />,
                label: "Sales Return",
              },
              {
                icon: <FileMinus size={18} />,
                label: "Credit Notes",
              },
            ]}
          />

          <NavItem
            icon={<ShoppingCart size={20} />}
            label="Purchase"
            collapsed={collapsed}
            children={[
              {
                // icon: <Users size={18} />,
                label: "Vendor",
                to: "/vendorLayout",
              },
              {
                // icon: <Users size={18} />,
                label: "Expense",
                to: "/expensesLayout",
              },
              
            ]}
          />
          <NavItem
            icon={<UserCircle size={20} />}
            label="Accounts"
            collapsed={collapsed}
            children={[
              {
                // icon: <Users size={18} />,
                label: "Manual Journals",
                to: "/manualJournals",
              },
              {
                // icon: <Users size={18} />,
                label: "Chart of Accounts",
                to: "/ChartOfAccountsLayout",
              },
              
            ]}
          />

          {/* <NavItem
            icon={<Paintbrush size={20} />}
            label="Theme"
            collapsed={collapsed}
          /> */}
          {/* <NavItem
            icon={<Diamond size={20} />}
            label="Components"
            collapsed={collapsed}
          />
          <NavItem
            icon={<ShoppingCart size={20} />}
            label="E-commerce"
            collapsed={collapsed}
          />

          {!collapsed && (
            <div className="px-4 py-2 text-xs uppercase tracking-wider text-slate-500 mt-4">
              Extra
            </div>
          )} */}

          {/* <NavItem
            icon={<Calendar size={20} />}
            label="Calendar"
            collapsed={collapsed}
            badge="New"
          />
          <NavItem
            icon={<FileText size={20} />}
            label="Documentation"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Library size={20} />}
            label="Examples"
            collapsed={collapsed}
          /> */}
        </div>

        <div
          className={`p-4 mt-auto ${
            darkMode ? "bg-slate-800" : "bg-blue-50"
          } rounded-lg mx-2 mb-4`}
        >
          <div className="flex flex-col items-center">
            <Github size={24} className="text-blue-500" />
            {!collapsed && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={toggleTheme}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 px-4 rounded"
                >
                  {darkMode ? "Light" : "Dark"} Mode
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  to,
  notification,
  badge,
  collapsed,
  children = [],
  level = 0,
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = children.length > 0;
  const paddingLeft = collapsed ? "pl-0" : `pl-${4 + level * 4}`;

  const toggleOpen = () => {
    if (hasChildren) setOpen(!open);
  };

  const baseClass = `flex  items-center px-2 py-2 pr-4 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-700 cursor-pointer relative ${paddingLeft} rounded-lg`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        <div className="text-blue-500 text-sm">{icon}</div>
        {!collapsed && (
          <div className="flex items-center justify-between w-full ml-3 text-sm">
            <span>{label}</span>
            {badge && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className="text-sm">
      <div className={baseClass} onClick={toggleOpen}>
        <div className="text-blue-500">{icon}</div>
        {notification && (
          <div className="absolute left-8 top-2 w-2 h-2 bg-red-500 rounded-full"></div>
        )}
        {!collapsed && (
          <div className="flex items-center justify-between w-full ml-3">
            <span>{label}</span>
            <div className="flex items-center gap-1">
              {badge && (
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
              {hasChildren &&
                (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
            </div>
          </div>
        )}
      </div>
      {!collapsed && open && hasChildren && (
        <div className="ml-6 text-sm">
          {children.map((child, idx) => (
            <NavItem
              key={idx}
              {...child}
              collapsed={collapsed}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

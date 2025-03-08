import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaUserFriends,
  FaListOl,
} from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Leaderboard",
      path: "/user/dashboard/leaderboard",
      icon: <FaListOl />,
    },
    {
      name: "Budget",
      path: "/user/dashboard/budget",
      icon: <FaMoneyBillWave />,
    },
    { name: "Players", path: "/user/dashboard/players", icon: <FaUsers /> },
    { name: "Team", path: "/user/dashboard/team", icon: <FaUserFriends /> },
  ];

  return (
    <div className="h-screen w-64 bg-white/90 backdrop-blur-lg border-r border-gray-300 shadow-lg flex flex-col p-5 fixed">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Dashboard
      </h2>
      <nav>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
                ${
                  pathname === item.path
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 hover:bg-indigo-100"
                }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

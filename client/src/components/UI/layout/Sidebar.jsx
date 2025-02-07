import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, FileText, CreditCard, Clock, User } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Applications', icon: FileText, path: '/applications' }
  ];

  return (
    <div className="h-screen bg-white border-r">
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link key={item.title} to={item.path} className="flex items-center p-2 hover:bg-gray-100 rounded">
            <item.icon size={20} />
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
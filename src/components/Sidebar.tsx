import React from 'react';
import { Mail, BarChart2, Settings, Users, Layout, Inbox, Search } from 'lucide-react';

const Sidebar = ({ currentPath }: { currentPath: string }) => {
  const menuItems = [
    { icon: Layout, label: 'Dashboard', href: '#dashboard' },
    { icon: Mail, label: 'Campaigns', href: '#campaigns' },
    { icon: Users, label: 'Contacts', href: '#contacts' },
    { icon: Search, label: 'Lead Finder', href: '#leads' },
    { icon: Inbox, label: 'Unibox', href: '#unibox' },
    { icon: BarChart2, label: 'Analytics', href: '#analytics' },
    { icon: Settings, label: 'Settings', href: '#settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Mail className="w-6 h-6" />
          ColdMail
        </h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              currentPath === item.href ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
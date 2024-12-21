import React from 'react';
import { Mail } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur rounded-lg p-2">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl font-semibold">Instantly</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavDropdown label="Products">
              <DropdownItem>Email Finder</DropdownItem>
              <DropdownItem>Campaign Manager</DropdownItem>
              <DropdownItem>Analytics</DropdownItem>
            </NavDropdown>
            <NavDropdown label="Use Cases">
              <DropdownItem>Sales Teams</DropdownItem>
              <DropdownItem>Marketers</DropdownItem>
              <DropdownItem>Agencies</DropdownItem>
            </NavDropdown>
            <NavDropdown label="Resources">
              <DropdownItem>Blog</DropdownItem>
              <DropdownItem>Guides</DropdownItem>
              <DropdownItem>Support</DropdownItem>
            </NavDropdown>
            <button className="text-white/80 hover:text-white transition-colors">
              Pricing
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a 
              href="#auth"
              className="text-white/80 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a 
              href="#auth"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              GET STARTED
            </a>
            <button className="px-4 py-2 bg-white hover:bg-white/90 text-black rounded-lg transition-colors">
              SEE DEMO
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavDropdown = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
        {label}
        <span className="text-xs opacity-50 group-hover:opacity-100 transition-opacity">▼</span>
      </button>
      <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {children}
      </div>
    </div>
  );
};

const DropdownItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
      {children}
    </button>
  );
};

export default Navigation;
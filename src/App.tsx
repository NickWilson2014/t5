import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Contacts from './pages/Contacts';
import Campaigns from './pages/Campaigns';
import NewCampaign from './pages/NewCampaign';
import CampaignDetail from './pages/CampaignDetail';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Unibox from './pages/Unibox';
import LeadFinder from './pages/LeadFinder';
import { getCurrentUser } from './lib/auth';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
      if (user && currentPath === '#') {
        window.location.hash = '#dashboard';
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  if (currentPath === '#') {
    return <Landing />;
  }

  if (currentPath === '#auth') {
    return <Auth />;
  }

  if (!isAuthenticated) {
    window.location.hash = '#auth';
    return null;
  }

  const getCampaignId = () => {
    const match = currentPath.match(/#campaign\/([^\/]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} />
      <div className="ml-64">
        {currentPath === '#dashboard' && <Dashboard />}
        {currentPath === '#contacts' && <Contacts />}
        {currentPath === '#campaigns' && <Campaigns />}
        {currentPath === '#new-campaign' && <NewCampaign />}
        {currentPath.startsWith('#campaign/') && <CampaignDetail id={getCampaignId()!} />}
        {currentPath === '#analytics' && <Analytics />}
        {currentPath === '#settings' && <Settings />}
        {currentPath === '#unibox' && <Unibox />}
        {currentPath === '#leads' && <LeadFinder />}
      </div>
    </div>
  );
}

export default App;
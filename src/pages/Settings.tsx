import React from 'react';
import SettingsForm from '../components/settings/SettingsForm';

const Settings = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your account and email campaign settings.</p>
      </div>
      
      <SettingsForm />
    </div>
  );
};

export default Settings;
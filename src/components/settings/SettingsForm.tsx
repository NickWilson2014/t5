import React from 'react';
import { Save, LogOut } from 'lucide-react';
import { signOut } from '../../lib/auth';

const SettingsForm = () => {
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Account Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your account preferences and settings</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Acme Inc"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Signature</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              defaultValue="Best regards,&#10;John Doe&#10;Sales Manager | Acme Inc"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
              <option>Mountain Time (MT)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Email Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Configure your email sending preferences</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Daily Email Limit</h3>
              <p className="text-sm text-gray-600">Maximum emails to send per day</p>
            </div>
            <input
              type="number"
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Follow-up Delay</h3>
              <p className="text-sm text-gray-600">Days to wait before follow-up</p>
            </div>
            <input
              type="number"
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="3"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
        
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Contact } from '../../types';
import AddContactModal from './AddContactModal';
import AuthModal from '../auth/AuthModal';
import { getContacts } from '../../lib/contacts';
import { getCurrentUser } from '../../lib/auth';

const ContactList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
      if (user) {
        loadContacts();
      }
    } catch (err) {
      setError('Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts');
    }
  };

  const handleAddContact = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowAddModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    loadContacts();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Sign in to manage contacts</h2>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign In
        </button>
        {showAuthModal && <AuthModal onClose={handleAuthSuccess} />}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <button 
            onClick={handleAddContact}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Contact
          </button>
        </div>
        {error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contacts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No contacts yet. Add your first contact to get started!
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.company}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        contact.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : contact.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{contact.location}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showAddModal && <AddContactModal onClose={() => {
        setShowAddModal(false);
        loadContacts();
      }} />}
      {showAuthModal && <AuthModal onClose={handleAuthSuccess} />}
    </>
  );
};

export default ContactList;
import React from 'react';
import ContactStats from '../components/contacts/ContactStats';
import ContactList from '../components/contacts/ContactList';

const Contacts = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <p className="text-gray-600 mt-1">Manage your contacts and track engagement.</p>
      </div>
      
      <ContactStats />
      <ContactList />
    </div>
  );
};

export default Contacts;
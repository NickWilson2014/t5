import React, { useState } from 'react';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';
import CSVUpload from './CSVUpload';

type Props = {
  onClose: () => void;
};

const AddContactModal = ({ onClose }: Props) => {
  const [mode, setMode] = useState<'manual' | 'csv'>('manual');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Contacts</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                mode === 'manual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setMode('csv')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                mode === 'csv'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              CSV Upload
            </button>
          </div>

          {mode === 'manual' ? <ContactForm onClose={onClose} /> : <CSVUpload onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
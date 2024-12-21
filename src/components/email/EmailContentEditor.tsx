import React from 'react';
import BasicEditor from '../editor/BasicEditor';

interface EmailContentEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
}

const EmailContentEditor: React.FC<EmailContentEditorProps> = ({ 
  value, 
  onChange,
  label = 'Email Content'
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <BasicEditor value={value || ''} onChange={onChange} />
    </div>
  );
};

export default React.memo(EmailContentEditor);
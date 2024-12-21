import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface BasicEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const BasicEditor: React.FC<BasicEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-white">
        <button
          onClick={() => handleCommand('bold')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('italic')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('underline')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1" />

        <button
          onClick={() => handleCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1" />

        <button
          onClick={() => handleCommand('justifyLeft')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('justifyCenter')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleCommand('justifyRight')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none bg-white"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default React.memo(BasicEditor);
import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive('bold') ? 'bg-gray-100' : ''
        }`}
      >
        <Bold className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive('italic') ? 'bg-gray-100' : ''
        }`}
      >
        <Italic className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive('underline') ? 'bg-gray-100' : ''
        }`}
      >
        <Underline className="w-4 h-4" />
      </button>

      <div className="h-6 border-l border-gray-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-100' : ''
        }`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-100' : ''
        }`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-100' : ''
        }`}
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="h-6 border-l border-gray-300 mx-1" />

      <button
        onClick={addLink}
        className={`p-2 hover:bg-gray-100 rounded ${
          editor.isActive('link') ? 'bg-gray-100' : ''
        }`}
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default React.memo(EditorToolbar);
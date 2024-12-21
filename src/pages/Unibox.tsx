import React, { useState, useEffect } from 'react';
import { getReplies, markAsRead, archiveReply, sendReply } from '../lib/replies';
import { Mail, Archive, Reply, Search } from 'lucide-react';
import type { EmailReply } from '../types';
import BasicEditor from '../components/editor/BasicEditor';

const Unibox = () => {
  const [replies, setReplies] = useState<EmailReply[]>([]);
  const [selectedReply, setSelectedReply] = useState<EmailReply | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReplies();
  }, []);

  const loadReplies = async () => {
    try {
      setLoading(true);
      const data = await getReplies();
      setReplies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load replies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReply = async (reply: EmailReply) => {
    if (!reply.read) {
      try {
        await markAsRead(reply.id);
        setReplies(replies.map(r => 
          r.id === reply.id ? { ...r, read: true } : r
        ));
      } catch (err) {
        console.error('Failed to mark as read:', err);
      }
    }
    setSelectedReply(reply);
  };

  const handleArchive = async (reply: EmailReply) => {
    try {
      await archiveReply(reply.id);
      setReplies(replies.filter(r => r.id !== reply.id));
      if (selectedReply?.id === reply.id) {
        setSelectedReply(null);
      }
    } catch (err) {
      console.error('Failed to archive:', err);
    }
  };

  const handleSendReply = async () => {
    if (!selectedReply || !replyContent.trim()) return;
    
    try {
      await sendReply(selectedReply.id, replyContent);
      setReplyContent('');
      // In a real app, you might want to update the UI to show the sent reply
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  const filteredReplies = replies.filter(reply =>
    reply.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.from_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Unibox</h1>
        <p className="text-gray-600 mt-1">Manage all your email replies in one place.</p>
      </div>

      {error ? (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100 p-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search replies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 h-[calc(100vh-16rem)]">
            {/* Reply List */}
            <div className="col-span-1 border-r border-gray-100 overflow-y-auto">
              {filteredReplies.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No replies found
                </div>
              ) : (
                filteredReplies.map((reply) => (
                  <div
                    key={reply.id}
                    onClick={() => handleSelectReply(reply)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedReply?.id === reply.id ? 'bg-blue-50' : ''
                    } ${!reply.read ? 'font-semibold' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm text-gray-900">{reply.from_email}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.received_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {reply.subject}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {reply.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Reply Content */}
            <div className="col-span-2 flex flex-col">
              {selectedReply ? (
                <>
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">{selectedReply.subject}</h2>
                        <p className="text-sm text-gray-600">
                          From: {selectedReply.from_email}
                          {selectedReply.campaign && (
                            <span className="ml-2 text-blue-600">
                              Campaign: {selectedReply.campaign.name}
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleArchive(selectedReply)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: selectedReply.content }} />
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-lg font-semibold mb-4">Your Reply</h3>
                      <BasicEditor value={replyContent} onChange={setReplyContent} />
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={handleSendReply}
                          disabled={!replyContent.trim()}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                        >
                          <Reply className="w-4 h-4" />
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Select a reply to view its content</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unibox;
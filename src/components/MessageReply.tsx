import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { addMessageNote } from '../lib/firebase/messages';
import { useAuth } from '../contexts/AuthContext';
import type { Message, MessageNote } from '../types';

interface MessageReplyProps {
  message: Message;
  onClose: () => void;
  onReplySuccess: (note: MessageNote) => void;
}

export default function MessageReply({ message, onClose, onReplySuccess }: MessageReplyProps) {
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !replyText.trim()) return;

    setSending(true);
    setError(null);

    const { error } = await addMessageNote(message.id, replyText, user.uid);
    
    if (error) {
      setError(error);
      setSending(false);
      return;
    }

    // Create new note object
    const newNote: MessageNote = {
      text: replyText,
      userId: user.uid,
      timestamp: new Date()
    };

    onReplySuccess(newNote);
    setReplyText('');
    setSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Reply to Message</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Original Message */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Original Message from {message.name}:</div>
          <div className="text-gray-700">{message.message}</div>
        </div>

        {/* Message Thread */}
        {message.notes && message.notes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Replies</h4>
            <div className="space-y-3">
              {message.notes.map((note, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-700">{note.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {note.timestamp.toDate().toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending || !replyText.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
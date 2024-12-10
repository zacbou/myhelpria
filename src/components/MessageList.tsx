import React, { useEffect, useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, MessageSquare, Filter, Loader, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { getMessages, updateMessageStatus, addMessageNote } from '../lib/firebase/messages';
import { useAuth } from '../contexts/AuthContext';
import type { Message, MessageStatus } from '../types';

interface ExpandedMessage {
  id: string;
  showReply: boolean;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<MessageStatus | 'all'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<ExpandedMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const { user } = useAuth();

  // Utility functions for styling
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return 'text-blue-600';
      case 'in-progress':
        return 'text-yellow-600';
      case 'resolved':
        return 'text-green-600';
    }
  };

  const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  useEffect(() => {
    loadMessages();
  }, [statusFilter]);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);
    const { messages, error } = await getMessages(statusFilter === 'all' ? undefined : statusFilter);
    if (error) {
      setError(error);
    } else {
      setMessages(messages);
    }
    setLoading(false);
  };

  const handleStatusChange = async (messageId: string, newStatus: MessageStatus) => {
    setProcessingId(messageId);
    const { error } = await updateMessageStatus(messageId, newStatus);
    if (error) {
      setError(error);
    } else {
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ));
    }
    setProcessingId(null);
  };

  const handleReply = async (messageId: string) => {
    if (!replyText.trim() || !user) return;

    setProcessingId(messageId);
    const { error } = await addMessageNote(messageId, replyText, user.uid);
    
    if (error) {
      setError(error);
    } else {
      setMessages(messages.map(msg => 
        msg.id === messageId ? {
          ...msg,
          notes: [...msg.notes, {
            text: replyText,
            userId: user.uid,
            timestamp: new Date()
          }]
        } : msg
      ));
      setReplyText('');
      setExpandedMessage(prev => prev ? { ...prev, showReply: false } : null);
    }
    setProcessingId(null);
  };

  const toggleExpand = (messageId: string) => {
    setExpandedMessage(prev => 
      prev?.id === messageId ? null : { id: messageId, showReply: false }
    );
  };

  const toggleReply = (messageId: string) => {
    setExpandedMessage(prev => 
      prev?.id === messageId 
        ? { ...prev, showReply: !prev.showReply }
        : { id: messageId, showReply: true }
    );
    setReplyText('');
  };

  const MessagePreview = ({ message }: { message: Message }) => {
    const isExpanded = expandedMessage?.id === message.id;
    
    return (
      <div className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div 
          className="p-4 cursor-pointer"
          onClick={() => toggleExpand(message.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium text-gray-900">{message.subject}</h4>
                <div className="flex space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                    {getPriorityIcon(message.priority)}
                    <span className="ml-1 capitalize">{message.priority}</span>
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">From: {message.name}</p>
              <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
            </div>
            <button className="ml-4 text-gray-400">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200">
            <div className="p-4">
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
              
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-900">Contact Information:</h5>
                <div className="mt-1 text-sm text-gray-500">
                  <p>Preferred Contact: {message.preferredContact}</p>
                  {message.email && <p>Email: {message.email}</p>}
                  {message.phone && <p>Phone: {message.phone}</p>}
                </div>
              </div>

              {message.notes.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-sm font-medium text-gray-900 mb-4">Response History:</h5>
                  <div className="space-y-4">
                    {message.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.text}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          {note.timestamp.toDate().toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => toggleReply(message.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {expandedMessage?.showReply ? 'Cancel Reply' : 'Reply'}
                </button>

                <select
                  value={message.status}
                  onChange={(e) => handleStatusChange(message.id, e.target.value as MessageStatus)}
                  disabled={processingId === message.id}
                  className={`block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${getStatusColor(message.status)}`}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {expandedMessage?.showReply && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    rows={4}
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => handleReply(message.id)}
                      disabled={!replyText.trim() || processingId === message.id}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {processingId === message.id ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Support Messages
          </h3>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as MessageStatus | 'all')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessagePreview key={message.id} message={message} />
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              {statusFilter === 'all' 
                ? 'No messages received yet'
                : `No ${statusFilter} messages found`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, Shield, Trash2, Clock, X, Check, MessageSquare, Edit, Eye } from 'lucide-react';
import { 
  inviteTeamMember, 
  getTeamMembers, 
  getPendingInvites,
  removeTeamMember,
  cancelInvite,
  ROLE_PERMISSIONS,
  ROLE_DESCRIPTIONS
} from '../lib/firebase/team';
import type { TeamRole } from '../types';

export default function TeamManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'editor' as TeamRole
  });

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-5 w-5 text-purple-600" />;
      case 'editor':
        return <Edit className="h-5 w-5 text-blue-600" />;
      case 'viewer':
        return <Eye className="h-5 w-5 text-green-600" />;
      case 'message_responder':
        return <MessageSquare className="h-5 w-5 text-orange-600" />;
    }
  };

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    setLoading(true);
    setError(null);

    const [membersResult, invitesResult] = await Promise.all([
      getTeamMembers(),
      getPendingInvites()
    ]);

    if (membersResult.error) {
      setError(membersResult.error);
    } else {
      setMembers(membersResult.members);
    }

    if (invitesResult.error) {
      setError(invitesResult.error);
    } else {
      setPendingInvites(invitesResult.invites);
    }

    setLoading(false);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await inviteTeamMember(inviteForm.email, inviteForm.role);
    
    if (error) {
      setError(error);
    } else {
      setSuccess('Invitation sent successfully');
      setInviteForm({ email: '', role: 'editor' });
      setShowInviteForm(false);
      loadTeamData();
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) {
      return;
    }

    const { error } = await removeTeamMember(memberId);
    if (error) {
      setError(error);
    } else {
      setSuccess('Team member removed successfully');
      loadTeamData();
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    const { error } = await cancelInvite(inviteId);
    if (error) {
      setError(error);
    } else {
      setSuccess('Invitation cancelled successfully');
      loadTeamData();
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-center h-32">
          <Clock className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
            </div>
            <button
              onClick={() => setShowInviteForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          {showInviteForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-xl">
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="team@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as any })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                    <option value="message_responder">Message Responder</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    {ROLE_DESCRIPTIONS[inviteForm.role].description}
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {/* Active Members */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Active Members</h3>
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {getRoleIcon(member.role)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.email}</div>
                        <div className="text-sm text-gray-500">
                          {ROLE_DESCRIPTIONS[member.role].name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-xs text-gray-500">
                        {ROLE_PERMISSIONS[member.role].map((permission) => (
                          <div key={permission} className="flex items-center mt-1">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            {permission.split('_').join(' ')}
                          </div>
                        ))}
                      </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Invitations</h3>
                <div className="space-y-3">
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-yellow-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{invite.email}</div>
                          <div className="text-sm text-gray-500">
                            Invited as {invite.role} • {new Date(invite.invitedAt?.toDate()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelInvite(invite.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

import type { TeamRole } from '../../types';

interface TeamMember {
  id: string;
  email: string;
  role: TeamRole;
  status: 'pending' | 'active';
  invitedBy: string;
  invitedAt: any;
  companyId: string;
}

interface TeamInvite {
  email: string;
  role: TeamRole;
  companyId: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'declined';
  invitedAt: any;
}

export const ROLE_PERMISSIONS: Record<TeamRole, string[]> = {
  admin: [
    'manage_team',
    'manage_articles',
    'manage_settings',
    'view_analytics',
    'respond_messages',
    'delete_messages',
  ],
  editor: [
    'manage_articles',
    'view_analytics',
    'respond_messages',
  ],
  viewer: [
    'view_articles',
    'view_analytics',
  ],
  message_responder: [
    'view_messages',
    'respond_messages',
  ],
};

export const ROLE_DESCRIPTIONS: Record<TeamRole, { name: string; description: string }> = {
  admin: {
    name: 'Administrator',
    description: 'Full access to all features and settings',
  },
  editor: {
    name: 'Editor',
    description: 'Can manage articles and respond to messages',
  },
  viewer: {
    name: 'Viewer',
    description: 'Read-only access to articles and analytics',
  },
  message_responder: {
    name: 'Message Responder',
    description: 'Can view and respond to support messages',
  },
};
export const inviteTeamMember = async (email: string, role: TeamMember['role']) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const companyRef = doc(db, 'companies', auth.currentUser.uid);
    const companySnap = await getDoc(companyRef);

    if (!companySnap.exists()) {
      throw new Error('Company profile not found');
    }

    // Check if user is already invited
    const invitesRef = collection(db, 'teamInvites');
    const q = query(
      invitesRef,
      where('email', '==', email),
      where('companyId', '==', auth.currentUser.uid),
      where('status', '==', 'pending')
    );
    
    const existingInvites = await getDocs(q);
    if (!existingInvites.empty) {
      throw new Error('User already has a pending invitation');
    }

    // Create new invite
    const invite: TeamInvite = {
      email,
      role,
      companyId: auth.currentUser.uid,
      invitedBy: auth.currentUser.uid,
      status: 'pending',
      invitedAt: serverTimestamp()
    };

    const inviteRef = doc(collection(db, 'teamInvites'));
    await setDoc(inviteRef, invite);

    // TODO: Send email invitation (implement email service)

    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getTeamMembers = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const membersRef = collection(db, 'teamMembers');
    const q = query(membersRef, where('companyId', '==', auth.currentUser.uid));
    const snapshot = await getDocs(q);

    const members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TeamMember[];

    return { members, error: null };
  } catch (error: any) {
    return { members: [], error: error.message };
  }
};

export const getPendingInvites = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    const invitesRef = collection(db, 'teamInvites');
    const q = query(
      invitesRef,
      where('companyId', '==', auth.currentUser.uid),
      where('status', '==', 'pending')
    );
    
    const snapshot = await getDocs(q);
    const invites = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TeamInvite[];

    return { invites, error: null };
  } catch (error: any) {
    return { invites: [], error: error.message };
  }
};

export const removeTeamMember = async (memberId: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    await deleteDoc(doc(db, 'teamMembers', memberId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const cancelInvite = async (inviteId: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    await deleteDoc(doc(db, 'teamInvites', inviteId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
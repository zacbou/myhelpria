import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
  doc,
  arrayUnion,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Message, MessageStatus } from '../../types';

const MESSAGES_COLLECTION = 'messages';

// Calculate message priority based on content
const calculatePriority = (subject: string, message: string): 'high' | 'medium' | 'low' => {
  const urgentKeywords = ['urgent', 'emergency', 'critical', 'asap', 'immediately'];
  const mediumKeywords = ['important', 'issue', 'problem', 'help', 'error'];
  
  const combinedText = `${subject} ${message}`.toLowerCase();
  
  if (urgentKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'high';
  }
  
  if (mediumKeywords.some(keyword => combinedText.includes(keyword))) {
    return 'medium';
  }
  
  return 'low';
};

// Add new message
export const addMessage = async (data: {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'both';
}) => {
  try {
    const priority = calculatePriority(data.subject, data.message);
    
    const messageData = {
      ...data,
      priority,
      status: 'new' as MessageStatus,
      timestamp: Timestamp.now(),
      lastUpdated: Timestamp.now(),
      assignedTo: null,
      readStatus: false,
      notes: []
    };

    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), messageData);
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

// Get messages with optional status filter
export const getMessages = async (status?: MessageStatus) => {
  try {
    let q = status 
      ? query(
          collection(db, MESSAGES_COLLECTION),
          where('status', '==', status),
          orderBy('priority', 'desc'),
          orderBy('timestamp', 'desc')
        )
      : query(
          collection(db, MESSAGES_COLLECTION),
          orderBy('priority', 'desc'),
          orderBy('timestamp', 'desc')
        );

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];

    return { messages, error: null };
  } catch (error: any) {
    return { messages: [], error: error.message };
  }
};

// Add reply note to message
export const addMessageNote = async (messageId: string, text: string, userId: string) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
    await updateDoc(messageRef, {
      notes: arrayUnion({
        text,
        userId,
        timestamp: Timestamp.now()
      }),
      lastUpdated: Timestamp.now()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Update message status
export const updateMessageStatus = async (messageId: string, status: MessageStatus) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId);
    await updateDoc(messageRef, {
      status,
      lastUpdated: Timestamp.now()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Delete message
export const deleteMessage = async (messageId: string) => {
  try {
    await deleteDoc(doc(db, MESSAGES_COLLECTION, messageId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
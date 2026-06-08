import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/**
 * Deletes a post from Firestore
 * @param postId The ID of the post to delete
 */
export const deletePost = async (postId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'posts', postId));
    console.log('Post deleted successfully:', postId);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

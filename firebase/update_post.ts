import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const updatePost = async (postId: string, data: any) => {
  await updateDoc(
    doc(db, 'posts', postId),
    data
  );
};
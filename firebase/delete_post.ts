import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../firebaseConfig';

export const deletePost = async (postId: string) => {
  await deleteDoc(
    doc(db, 'posts', postId)
  );
};

import {
  collection,
  getDocs,
} from 'firebase/firestore';

import { db } from '../firebase';

export async function fetchProducts() {
  const snapshot = await getDocs(
    collection(db, 'products')
  );

  return snapshot.docs.map((productDoc) => ({
    ...productDoc.data(),
    id: productDoc.id,
  }));
}

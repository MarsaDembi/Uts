import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCeGvpkbFEBnYTQfA9UvaoXN31sQsPjnGI',
  authDomain: 'cv-online-sa.firebaseapp.com',
  projectId: 'cv-online-sa',
  storageBucket: 'cv-online-sa.appspot.com',
  messagingSenderId: '404569268536',
  appId: '1:404569268536:web:ae6a166af86d8dec0961cd',
  measurementId: 'G-M6JH04LB52',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

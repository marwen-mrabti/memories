// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7MdypSydUD1mIMe85GkkpbSCJxVajNn0',
  authDomain: 'memories-c174e.firebaseapp.com',
  projectId: 'memories-c174e',
  storageBucket: 'memories-c174e.appspot.com',
  messagingSenderId: '614030336656',
  appId: '1:614030336656:web:98fc23158fad7b364eae15',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

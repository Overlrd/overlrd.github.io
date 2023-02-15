import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'

// Add Firebase products that you want to use
import { getFirestore, getDocs, collection  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-7wzGuW4agUGH3KLB8IkRkW-HPfa2bMs",
    authDomain: "portofolio-5cd7f.firebaseapp.com",
    projectId: "portofolio-5cd7f",
    storageBucket: "portofolio-5cd7f.appspot.com",
    messagingSenderId: "59825575518",
    appId: "1:59825575518:web:34c725057af63c239446cf"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const GetWolfs = () => {
    return getDocs(collection(db, "infos"))
};

export const GetGoose = () => {
  return getDocs(collection(db, "certifications"))
}
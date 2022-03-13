// https://facebook-2-6eb19.firebaseapp.com/__/auth/handler

import firebase from "firebase";
import "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM3U-xWMESAklpAEhjxEg2DM2weQ5hsM4",
  authDomain: "nextjs-facebook-clone-c641f.firebaseapp.com",
  projectId: "nextjs-facebook-clone-c641f",
  storageBucket: "nextjs-facebook-clone-c641f.appspot.com",
  messagingSenderId: "818921706048",
  appId: "1:818921706048:web:0e5bf2846dcdcf570d85a5",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();

export { auth, db, storage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVlzvyetiyxM40AhnFlITvlJ2n0GBWTQE",
  authDomain: "crwn-clothing-db-63af4.firebaseapp.com",
  projectId: "crwn-clothing-db-63af4",
  storageBucket: "crwn-clothing-db-63af4.appspot.com",
  messagingSenderId: "467139461296",
  appId: "1:467139461296:web:4b326bbaceadf6eabdbb75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

//Googleログイン
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//ログインしたユーザーをfirestoreに格納
//存在していたら参照のみ
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

//アカウント作成
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//ログイン
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//ログアウト
export const signOutUser = async () => {
  return await signOut(auth);
};

//ユーザーを監視して動きがあったら発火
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

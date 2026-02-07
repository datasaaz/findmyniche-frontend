import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth} from "../firebase";



export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}


export const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
 
export const signUpWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
 
export const logOut = async () => {
  return signOut(auth);
};
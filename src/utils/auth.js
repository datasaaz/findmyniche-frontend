import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification } from "firebase/auth";

import { auth} from "../firebase";


// export const signInWithEmailAndPassword = async (email, password) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}


export const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
 
export const signUpWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const resendVerificationEmail = async (user) => {
  return sendEmailVerification(user);
};

export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Please log in instead.";
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 8 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};
 
export const logOut = async () => {
  return signOut(auth);
};
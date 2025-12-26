import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  AuthError,
} from "firebase/auth";
import { auth } from "./firebase.client";

export async function signUpEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signInMicrosoft() {
  // Firebase Auth OIDC via OAuthProvider (provider ID must match your Firebase configuration)
  // Commonly: "microsoft.com" if configured that way in Firebase.
  const provider = new OAuthProvider("microsoft.com");
  return signInWithPopup(auth, provider);
}

export function friendlyAuthError(err: unknown): string {
  const e = err as AuthError;
  const code = e?.code ?? "";

  if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
    return code;
  }
  if (code === "auth/user-not-found") {
    return "No account found with that email.";
  }
  if (code === "auth/email-already-in-use") {
    return "An account already exists with that email.";
  }
  if (code === "auth/weak-password") {
    return "Password is too weak. Use at least 6 characters.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Sign-in popup was closed before completing.";
  }
  if (code === "auth/popup-blocked") {
    return "Popup was blocked by your browser. Please allow popups and try again.";
  }

  return `Auth error: ${code || "unknown"} ${e?.message ? `— ${e.message}` : ""}`;

}

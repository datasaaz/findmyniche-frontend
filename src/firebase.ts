import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"
// import { initializeAppCheck, ReCaptchaV3Provider, getToken } from "firebase/app-check"

const firebaseConfig = {
  apiKey: "AIzaSyDjXigFVx2q6o_HA16OriNKNtTxMO0-9bY",
  authDomain: "findmyniche-483917.firebaseapp.com",
  projectId: "findmyniche-483917",
  storageBucket: "findmyniche-483917.firebasestorage.app",
  messagingSenderId: "747869728784",
  appId: "1:747869728784:web:4bc3bd0ccdbd2181bf9a95",
  measurementId: "G-PB98LGYEH3"
}

const app = initializeApp(firebaseConfig)

// AUTH
export const auth = getAuth(app)

// APP CHECK
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(
//     "6LdwN08sAAAAAFyCF0W3zL5zus3lvg5mnQ1EQ02O"
//   ),
//   isTokenAutoRefreshEnabled: true
// })

// HELPERS
// export async function getAppCheckToken() {
//   const { token } = await getToken(appCheck, false)
//   return token
// }

export async function getIdToken() {
  let user = auth.currentUser

  if (!user) {
    const cred = await signInAnonymously(auth)
    user = cred.user
  }

  return await user.getIdToken()
}
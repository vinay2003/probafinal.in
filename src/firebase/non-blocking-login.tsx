'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

async function handleUserCreation(
  firestore: Firestore,
  userCredential: UserCredential
) {
  const user = userCredential.user;
  if (!user) return;
  const userRef = doc(firestore, 'users', user.uid);

  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const newUser = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
      subscriptionTier: 'free',
      featureTrials: {
        quiz: 5,
        flashcards: 5,
        assistant: 5,
      }
    };
    await setDoc(userRef, newUser, { merge: true });
  }
}

export async function initiateAnonymousSignIn(
  authInstance: Auth,
  firestore: Firestore
): Promise<void> {
  const uc = await signInAnonymously(authInstance);
  await handleUserCreation(firestore, uc);
}

export async function initiateEmailSignUp(
  authInstance: Auth,
  firestore: Firestore,
  email: string,
  password: string
): Promise<void> {
  const uc = await createUserWithEmailAndPassword(authInstance, email, password);
  await handleUserCreation(firestore, uc);
}

export async function initiateEmailSignIn(
  authInstance: Auth,
  email: string,
  password: string
): Promise<void> {
  await signInWithEmailAndPassword(authInstance, email, password);
}

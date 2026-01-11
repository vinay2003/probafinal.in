import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
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

/**
 * Initiates valid OAuth login flow.
 * 
 * Note: Ensure these providers are enabled in Firebase Console.
 * - Google: Auto-enabled in many cases, but check Console.
 * - Microsoft: Requires Azure AD App Registration (Client ID/Secret).
 * - GitHub: Requires OAuth App in GitHub Developer Settings (Client ID/Secret).
 */
export async function initiateSocialSignIn(
  authInstance: Auth,
  firestore: Firestore,
  providerName: 'google' | 'github' | 'microsoft'
): Promise<void> {
  let provider;
  switch (providerName) {
    case 'google':
      provider = new GoogleAuthProvider();
      break;
    case 'github':
      provider = new GithubAuthProvider();
      break;
    case 'microsoft':
      provider = new OAuthProvider('microsoft.com');
      break;
    default:
      throw new Error(`Provider ${providerName} not supported`);
  }

  const uc = await signInWithPopup(authInstance, provider);
  await handleUserCreation(firestore, uc);
}

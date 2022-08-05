import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFireStore, doc, getDoc, setDoc } from 'firebase/firestone';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhdvl_uqmEH-QMWQiE1xB-n8gP-J2xqUg",
    authDomain: "crwn-clothing-db-dd917.firebaseapp.com",
    projectId: "crwn-clothing-db-dd917",
    storageBucket: "crwn-clothing-db-dd917.appspot.com",
    messagingSenderId: "897701404912",
    appId: "1:897701404912:web:71c1de117717070ace2235"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    promt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFireStore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data does exsist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });

        } catch (error) {

        }
    }
    return userDocRef;
    //if user exsists
};


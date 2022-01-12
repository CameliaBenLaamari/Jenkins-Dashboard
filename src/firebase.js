import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEil4zm-r3ott9cIl3uHZ1mE-jaj8fx7I",
    authDomain: "jenkins-dashboard-1b968.firebaseapp.com",
    projectId: "jenkins-dashboard-1b968",
    storageBucket: "jenkins-dashboard-1b968.appspot.com",
    messagingSenderId: "434705617628",
    appId: "1:434705617628:web:7684c0f42f48fd328c9a19"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export async function setUser(uid, username, email, password, jenkinsUsername, jenkinsPassword) {
    const docRef = doc(db, "users", uid);
    const docData = {
        username: username,
        email: email,
        password: password,
        jenkinsUsername: jenkinsUsername,
        jenkinsPassword: jenkinsPassword
    };
    await setDoc(docRef, docData);
}

export async function getUser(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return;
    }
}

export async function setJenkins(uid, data, jobs) {
    const docRef = doc(db, "jenkins", uid);
    const docData = {
        data: data,
        jobs: jobs
    };
    await setDoc(docRef, docData);
}

export async function getJenkins(uid) {
    const docRef = doc(db, "jenkins", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data().data;
        const jobs = docSnap.data().jobs;
        return { data, jobs };
    } else {
        console.log("No such document!");
        return;
    }
}

export async function setWidget(uid, item, position) {
    const docRef = doc(db, "widgets", uid);
    const { items, positions } = await getWidgets(uid);
    items.push(item);
    positions.push(position);
    const docData = {
        items: items,
        positions: positions
    }
    await setDoc(docRef, docData);
}

export async function getWidgets(uid) {
    const docRef = doc(db, "widgets", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const items = docSnap.data().items;
        const positions = docSnap.data().positions;
        return { items, positions };
    } else {
        console.log("No such document!");
        return;
    }
}

export default app;
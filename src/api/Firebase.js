// Import the functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Firebase methods for users admin
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  
};



// Firebase methods for bank operations

// Transaction logic with check account balance, update accounts and create notifcation
export const createTransaction = async(from_user, to_user, quantity) => {
  let obj = {from: from_user, to: to_user, quantity: quantity}
  if(!checkMoneyInAccount(obj.from, obj.quantity)){
    return 'Insufficient Funds'
  }
  const colRef = collection(db, 'transactions');
  const data = await addDoc(colRef, obj);
  updateBankAccount(obj.from_user, obj.quantity)
  updateBankAccount(obj.to_user, obj.quantity, true)
  createNotification(obj.to_user, obj.from_user)
  return data.id;
}

// Check if account has enough money 
const checkMoneyInAccount = async (value, money) => {
  const colRef = collection(db, 'bankAccount');
  const result = await getDoc(query(colRef, where('userApp_id', '==', value)));
  let account = result.data()
  return (account.amount >= money) ? true : false
}

// Update bank account with money, substract money by default
export const updateBankAccount = async (user_id, quantity, add=false) => {
  const colRef = collection(db, 'bankAccount');
  const result = await getDoc(query(colRef, where('userApp_id', '==', user_id)));
  let money = (add) ? quantity + result.data().amount : quantity - result.data().amount 
  let objToUpdate = {userApp_id: user_id, amount: money}
  await updateDoc(doc(colRef, result.data().id), objToUpdate)
}

// Create notification to user who recieve money.
const createNotification = async (user_id, from_user) => {
  let obj = {notified: false, to: user_id, transaction: from_user}
  const colRef = collection(db, 'notiications');
  const data = await addDoc(colRef, obj);
  return data.id
}


// Get all notifications by user
export const getAllNotificationsByUser = async(user_id) => {
  const colRef = collection(db, 'notiications');
  const result = await getDocs(query(colRef, where('to', '==', user_id), where('notified', '==', false)));
  return getArrayFromCollection(result)
}

// Get all notifications by user
export const getAccountBalance = async(user_id) => {
  console.log(user_id, typeof(user_id));
  const colRef = collection(db, 'bankAccount');
  const result = await getDoc(query(colRef, where('userApp_id', '==', parseInt(user_id))));
  console.log(result);
  return result.data()
}

// Update notification to check if has been seen
export const markNotificationAsSeen = async (id) => {
  const colRef = collection(db, 'bankAccount');
  const result = await getDoc(query(colRef, where('id', '==', id)));
  let objToUpdate = {notified: true, to: result.data().to, transaction: result.data().transaction}
  await updateDoc(doc(colRef, result.data().id), objToUpdate)
}


// Help method
const getArrayFromCollection = (collection) => {
  return collection.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
  });
}

// // Read
// export const getItems= async (collection)  => {
//   const colRef = collection(db, collection);
//   const result = await getDocs(query(colRef));
//   return getArrayFromCollection(result);
// }


// export const getItemById = async (id, collection) => {
//   const colRef = collection(db, collection);
//   const result = await getDoc(doc(colRef, id));
//   return result.data();
// }

// // Delete
// export const deleteItem = async (id) => {
//   const colRef = collection(db, 'items');
//   await deleteDoc(doc(colRef, id));
// }




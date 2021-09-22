import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBK9QrqmNJlvvRO5Ooa9Zfn_IxaiU_kwH4",
  authDomain: "turkishimdb.firebaseapp.com",
  projectId: "turkishimdb",
  storageBucket: "turkishimdb.appspot.com",
  messagingSenderId: "460053572373",
  appId: "1:460053572373:web:dfbf3c7180f2ebfdf1571c",
  measurementId: "G-6RQ8K4RWXG",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Şifre sıfırlama bağlantısı mail adresinize gönderildi.");
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

const doComment = async (comment, params) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const name = user.displayName;
  if (user !== null) {
    try {
      await db.collection("comments").add({
        comment,
        params,
        uid,
        name,
      });
      await user.reload();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  } else {
    alert("Oturum açmadan yorum yapamazsınız.");
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  doComment,
};

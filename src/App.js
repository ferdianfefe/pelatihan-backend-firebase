import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { db, storage, auth } from "./utils/services/firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

function App() {
  const [books, setBooks] = useState([]);

  const createBook = async () => {
    try {
      const newDoc = await addDoc(collection(db, "books"), {
        title: "Jejak Si Abid",
        writer: "Abid Nujaiba",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async () => {
    let q = query(collection(db, "books"), limit(2));
    const firstDoc = (await getDocs(q)).docs[1];
    console.log(firstDoc);
    q = query(collection(db, "books"), startAfter(firstDoc));
    const docsRef = await getDocs(q);
    const result = [];
    docsRef.forEach((doc) => {
      result.push(doc.data());
    });
    console.log(result);
  };

  const updateBook = async () => {
    let q = query(collection(db, "books"), where("writer", "==", "Ihsan"));
    const firstDoc = (await getDocs(q)).docs[0];
    await updateDoc(firstDoc.ref, {
      title: "Jejak Si Ihsan",
      writer: "Ihsan",
      description: "lorem ipsum",
    });
  };

  const signIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await setPersistence(auth, browserSessionPersistence).then(async () => {
        const result = await signInWithPopup(auth, provider);
        if (result) {
          console.log(result.user);
        } else {
          throw new Error("error signing in");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyAuth = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        console.log("Authenticated");
      } else {
        console.log("Not authenticated");
      }
    });
  };

  const deleteBook = async () => {
    let q = query(collection(db, "books"), where("writer", "==", "Ihsan"));
    const firstDoc = (await getDocs(q)).docs[0];
    await deleteDoc(firstDoc.ref);
  };

  const addFile = async (e) => {
    const fileRef = ref(storage, "images/image1");

    await uploadBytes(fileRef, e.target.files[0]);

    const downloadURL = await getDownloadURL(ref(storage, "images/image1"));
    console.log(downloadURL);
  };

  const deleteFile = async () => {
    await deleteObject(ref(storage, "images/image1"))
  }

  return (
    <div className="App">
      <div className="w-full"></div>
      <button onClick={() => createBook()}>Add Book</button>
      <button onClick={() => getBooks()}>Get Book</button>
      <button onClick={() => updateBook()}>Update Book</button>
      <button onClick={() => deleteBook()}>Delete Book</button>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => verifyAuth()}>Verify Auth</button>
      <br />
      <br />
      <br />
      <br />
      <input onChange={addFile} type="file" name="" id="" />

      <button onClick={() => deleteFile()}>Delete File</button>
    </div>
  );
}

export default App;

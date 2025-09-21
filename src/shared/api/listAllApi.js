import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";

const colRef = collection(db, "listAll");

export async function findStudentInListAll(firstName, lastName) {
  const q = query(
    colRef,
    where("firstName", "==", firstName),
    where("lastName", "==", lastName)
  );
  return await getDocs(q);
}

export async function createStudentInListAll(student) {
  return await addDoc(colRef, {
    ...student,
    morning: false,
    evening: false,
  });
}

export async function updateStudentInListAll(id, data) {
  const docRef = doc(db, "listAll", id);
  return await updateDoc(docRef, data);
}

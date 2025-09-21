import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const studentsCol = collection(db, "students");

export async function createStudent(student) {
  return await addDoc(studentsCol, student);
}

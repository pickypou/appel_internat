import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";


export async function saveAttendanceHistory(listId, listName, students) {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const historyRef = doc(collection(db, "attendanceHistory"), `${date}_${listId}`);

  await setDoc(historyRef, {
    listId,
    listName,
    date,
    students,
  });

  return date;
}

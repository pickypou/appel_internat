import { db } from "../../../shared/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createStudentInListAll } from "../../add-to-list-all/model/addToListAll";

export async function saveList(listName, students) {
  try {
    const docRef = await addDoc(collection(db, "attendanceLists"), {
      name: listName,
      students: students.map((s) => ({ ...s, morning: false, evening: false }))
    });

    for (let s of students) {
      await createStudentInListAll({ ...s, morning: false, evening: false });
    }

    return docRef.id;
  } catch (err) {
    console.error("Erreur création liste:", err);
    throw err;
  }
}




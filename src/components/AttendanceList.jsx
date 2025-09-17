// AttendanceOnlyPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function AttendanceOnlyPage({ listId }) {
  const [listName, setListName] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      if (!listId) return;
      const listRef = doc(db, "attendanceLists", listId);
      const listSnap = await getDoc(listRef);
      if (listSnap.exists()) {
        const data = listSnap.data();
        setListName(data.name);
        setStudents(
          data.students.map(s => ({ ...s, morning: s.morning || false, evening: s.evening || false }))
        );
      }
    };
    fetchList();
  }, [listId]);

  const toggleAttendance = async (index, type) => {
  const updatedStudents = students.map((s, i) =>
    i === index ? { ...s, [type]: !s[type] } : s
  );
  setStudents(updatedStudents);

  // Mettre à jour Firestore
  const listRef = doc(db, "attendanceLists", listId);
  try {
    await updateDoc(listRef, { students: updatedStudents });
  } catch (err) {
    console.error("Erreur mise à jour Firestore:", err);
  }
};


  const saveAttendance = async () => {
    const listRef = doc(db, "attendanceLists", listId);
    try {
      await updateDoc(listRef, { students });
      alert("Liste enregistrée !");
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div>
      <h2>Liste d'appel – {listName}</h2>

      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", marginBottom: "10px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classe</th>
            <th>Chambre</th>
            <th>Matin</th>
            <th>Soir</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const problem = student.evening && !student.morning;
            return (
              <tr key={index} style={{ backgroundColor: problem ? "#f8d7da" : "white" }}>
                <td>{student.lastName}</td>
                <td>{student.firstName}</td>
                <td>{student.class}</td>
                <td>{student.roomNumber}</td>
                <td>
                  <input type="checkbox" checked={student.morning} onChange={() => toggleAttendance(index, "morning")} />
                </td>
                <td>
                  <input type="checkbox" checked={student.evening} onChange={() => toggleAttendance(index, "evening")} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      
    </div>
  );
}

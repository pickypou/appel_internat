// src/components/StudentList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../../shared/api/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "../../../features/pdf-export/model/attendancePdf";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();                                                            

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "listAll"));
      console.log("Docs récupérés:", snapshot.docs.map(d => d.data()));
      setStudents(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchStudents();
  }, []);

  const toggleAttendance = async (id, type) => {
    const updatedStudents = students.map((s) =>
      s.id === id ? { ...s, [type]: !s[type] } : s
    );
    setStudents(updatedStudents);

    const student = updatedStudents.find((s) => s.id === id);
    const studentRef = doc(db, "listAll", id);
    await updateDoc(studentRef, { morning: student.morning, evening: student.evening });
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>⬅ Retour</button>
      <h2>Liste complète des élèves</h2>

      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
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
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.lastName}</td>
              <td>{s.firstName}</td>
              <td>{s.class}</td>
              <td>{s.roomNumber}</td>
              <td>
                <input
                  type="checkbox"
                  checked={s.morning || false}
                  onChange={() => toggleAttendance(s.id, "morning")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={s.evening || false}
                  onChange={() => toggleAttendance(s.id, "evening")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
  <generatePdf students={students} />
    </div>
  );
  
}

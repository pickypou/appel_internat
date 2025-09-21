// src/components/AttendanceList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../../shared/api/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc
} from "firebase/firestore";
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import Button from "../../../widgets/button/ui/button";
import { Link } from "react-router-dom";
import "../styles/attendanceList.css";



const pdfStyles = StyleSheet.create({
  page: { padding: 20 },
  row: { marginBottom: 5 }
});

export default function AttendanceList({ listId }) {
  const [listName, setListName] = useState("");
  const [students, setStudents] = useState([]);

  // Plages horaires
  const MORNING_START = 6.5;
  const MORNING_END = 11.99;
  const EVENING_START = 18;
  const EVENING_END = 23;
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isMorning = currentHour >= MORNING_START && currentHour <= MORNING_END;
  const isEvening = currentHour >= EVENING_START && currentHour <= EVENING_END;

  // --- FETCH LIST ---
  useEffect(() => {
    const fetchList = async () => {
      if (!listId) return;
      const listRef = doc(db, "attendanceLists", listId);
      const listSnap = await getDoc(listRef);
      if (listSnap.exists()) {
        const data = listSnap.data();
        setListName(data.name);
        setStudents(
          data.students.map(s => ({
            ...s,
            morning: s.morning || false,
            evening: s.evening || false
          }))
        );
      }
    };
    fetchList();
  }, [listId]);

  // --- TOGGLE ATTENDANCE ---
  const toggleAttendance = async (index, type) => {
    const updatedStudents = students.map((s, i) =>
      i === index ? { ...s, [type]: !s[type] } : s
    );
    setStudents(updatedStudents);

    // Mettre à jour la liste spécifique
    const listRef = doc(db, "attendanceLists", listId);
    await updateDoc(listRef, { students: updatedStudents });

    // Synchroniser avec listAll
    for (let s of updatedStudents) {
      const q = query(
        collection(db, "listAll"),
        where("firstName", "==", s.firstName),
        where("lastName", "==", s.lastName)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const studentRef = doc(db, "listAll", snapshot.docs[0].id);
        await updateDoc(studentRef, { morning: s.morning, evening: s.evening });
      }
    }
  };

  // --- PDF DOCUMENT ---
  const MyDoc = (listName, students) => (
    <Document>
      <Page style={pdfStyles.page}>
        <Text style={{ marginBottom: 10, fontSize: 14 }}>{listName}</Text>
        {students.map(s => (
          <Text key={s.id} style={pdfStyles.row}>
            {s.firstName} {s.lastName} - Matin: {s.morning ? "✔️" : ""} - Soir: {s.evening ? "✔️" : ""}
          </Text>
        ))}
      </Page>
    </Document>
  );

  // --- SAVE HISTORY & RESET ---
  const handleGeneratePdf = async () => {
    // 1️⃣ Sauvegarde dans attendanceHistory
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const historyRef = doc(collection(db, "attendanceHistory"), `${date}_${listId}`);
    await setDoc(historyRef, { listId, listName, date, students });

    // 2️⃣ Réinitialisation des cases
    const resetStudents = students.map(s => ({ ...s, morning: false, evening: false }));
    setStudents(resetStudents);

    const listRef = doc(db, "attendanceLists", listId);
    await updateDoc(listRef, { students: resetStudents });

    // Synchronisation avec listAll
    for (let s of resetStudents) {
      const q = query(
        collection(db, "listAll"),
        where("firstName", "==", s.firstName),
        where("lastName", "==", s.lastName)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const studentRef = doc(db, "listAll", snapshot.docs[0].id);
        await updateDoc(studentRef, { morning: s.morning, evening: s.evening });
      }
    }
  };

  return (
    <div>
      {/* Bouton retour */}
       <Link to="/">
        <Button variant="secondary"> ← Retour </Button>  
       </Link>
      <h2>Liste d'appel – {listName}</h2>

      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", marginBottom: "10px" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classe</th>
            <th>Chambre</th>
            <th>Soir</th>
            <th>Matin</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            let bgColor = "white";
            if (isMorning) bgColor = student.morning ? "#d4edda" : "#f8d7da";
            else if (isEvening) bgColor = student.evening ? "#d4edda" : "#f8d7da";

            return (
              <tr key={index} style={{ backgroundColor: bgColor }}>
                <td>{student.lastName}</td>
                <td>{student.firstName}</td>
                <td>{student.class}</td>
                <td>{student.roomNumber}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={student.evening}
                    onChange={() => toggleAttendance(index, "evening")}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={student.morning}
                    onChange={() => toggleAttendance(index, "morning")}
                  />
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* PDF */}
      <PDFDownloadLink document={MyDoc(listName, students)} fileName={`${listName}.pdf`}>
        {({ loading }) => (loading ? "Chargement..." : "Télécharger PDF")}
      </PDFDownloadLink>

      <Button onClick={handleGeneratePdf} >
        Générer PDF et réinitialiser
      </Button>
    </div>
  );
}

import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateListPage() {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    class: "",
    roomNumber: "",
    phone: ""
  });

  const addStudentToList = () => {
    setStudents(prev => [...prev, { ...newStudent, morning: false, evening: false }]);
    setNewStudent({ firstName: "", lastName: "", class: "", roomNumber: "", phone: "" });
  };

  const saveList = async () => {
    if (!listName) return alert("Veuillez donner un nom à la liste !");
    try {
      const docRef = await addDoc(collection(db, "attendanceLists"), {
        name: listName,
        students
      });
      alert("Liste créée !");
      navigate(`/attendance/${docRef.id}`); // redirige vers la page de la liste créée
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div>
      <h2>Créer une nouvelle liste</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nom de l'encadrant"
          value={listName}
          onChange={e => setListName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Prénom" value={newStudent.firstName} onChange={e => setNewStudent(prev => ({ ...prev, firstName: e.target.value }))} />
        <input placeholder="Nom" value={newStudent.lastName} onChange={e => setNewStudent(prev => ({ ...prev, lastName: e.target.value }))} />
        <input placeholder="Classe" value={newStudent.class} onChange={e => setNewStudent(prev => ({ ...prev, class: e.target.value }))} />
        <input placeholder="Chambre" value={newStudent.roomNumber} onChange={e => setNewStudent(prev => ({ ...prev, roomNumber: e.target.value }))} />
        <input placeholder="Téléphone" value={newStudent.phone} onChange={e => setNewStudent(prev => ({ ...prev, phone: e.target.value }))} />
        <button onClick={addStudentToList}>Ajouter élève</button>
      </div>

      {students.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Élèves ajoutés :</h3>
          <ul>
            {students.map((s, index) => (
              <li key={index}>{s.firstName} {s.lastName} ({s.class})</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={saveList}>Enregistrer la liste</button>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveList } from "../../../features/create-list/model/createList";
import "../styles/createListePage.css";
import Button from "../../../widgets/button/ui/button";

export default function CreateListPage() {
  const [listName, setListName] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    class: "",
    roomNumber: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleAddStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName) return;
    setStudents((prev) => [...prev, newStudent]);
    setNewStudent({ firstName: "", lastName: "", class: "", roomNumber: "", phone: "" });
  };

  const handleSaveList = async () => {
    try {
      await saveList(listName, students);
      alert("Liste créée avec succès !");
      navigate("/");
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  };

  return (
    <div>
      <h2>Créer une nouvelle liste</h2>

      <div>
          <input
        placeholder="Nom de la liste"
        value={listName}
        onChange={(e) => setListName(e.target.value)} />
      </div>

    

      <div className="input-wrapper">
        <input
          placeholder="Prénom"
          value={newStudent.firstName}
          onChange={(e) => setNewStudent((p) => ({ ...p, firstName: e.target.value }))}
        />
        <input
          placeholder="Nom"
          value={newStudent.lastName}
          onChange={(e) => setNewStudent((p) => ({ ...p, lastName: e.target.value }))}
        />
        <input
          placeholder="Classe"
          value={newStudent.class}
          onChange={(e) => setNewStudent((p) => ({ ...p, class: e.target.value }))}
           style={{
    width: `${Math.max(8, newStudent.class.length)}ch`,
    minWidth: "120px",
    maxWidth: "100%",
  }}
        />
        <input
          placeholder="Chambre"
          value={newStudent.roomNumber}
          onChange={(e) => setNewStudent((p) => ({ ...p, roomNumber: e.target.value }))}
        />
        <input
          placeholder="Téléphone"
          value={newStudent.phone}
          onChange={(e) => setNewStudent((p) => ({ ...p, phone: e.target.value }))}
        />
      </div>
      

      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.firstName} {s.lastName} ({s.class})
          </li>
        ))}
      </ul>
      <Button onClick={handleAddStudent}>Ajouter élève</Button>
      <Button onClick={handleSaveList}>Enregistrer la liste</Button>
    </div>
  );
}

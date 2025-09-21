import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveList } from "../../../features/create-list/model/createList";

export default function CreateListPage() {
  const [listName, setListName] = useState("");
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ firstName: "", lastName: "", class: "", roomNumber: "", phone: "" });

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

  // UI inchangée
  return (
    <div>
      <h2>Créer une nouvelle liste</h2>
      {/* inputs et boutons */}
    </div>
  );
}

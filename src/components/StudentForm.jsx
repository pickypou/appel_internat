import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function StudentForm() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    class: "",
    phone: "",
    roomNumber: ""
  });

  const handleChange = (e) => {
    setStudent({...student, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "students"), student);
      alert("Élève ajouté !");
      setStudent({ firstName:"", lastName:"", class:"", phone:"", roomNumber:"" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="Prénom" value={student.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Nom" value={student.lastName} onChange={handleChange} />
      <input name="class" placeholder="Classe" value={student.class} onChange={handleChange} />
      <input name="phone" placeholder="Téléphone" value={student.phone} onChange={handleChange} />
      <input name="roomNumber" placeholder="Chambre" value={student.roomNumber} onChange={handleChange} />
      <button type="submit">Ajouter élève</button>
    </form>
  );
}

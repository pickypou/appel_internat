import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const snapshot = await getDocs(collection(db, "attendanceLists"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLists(data);
    };
    fetchLists();
  }, []);

  return (
    <div>
      <h1>Liste d'appel Internat</h1>

      <Link to="/create-list">
        <button style={{ marginBottom: "20px" }}>Créer une nouvelle liste</button>
      </Link>

      {lists.map(list => (
        <div key={list.id} style={{ marginBottom: "10px" }}>
          <Link to={`/attendance/${list.id}`}>
            <button>{list.name}</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

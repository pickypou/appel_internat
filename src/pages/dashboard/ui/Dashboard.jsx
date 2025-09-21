import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../shared/api/firebase";
import { collection, getDocs } from "firebase/firestore";
import Button from "../../../widgets/button/ui/button";


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
      <Button variant="primary">Créer une nouvelle liste</Button>
    </Link>  
    <div className="buttons-wrap">  

      {lists.map(list => (
        <div key={list.id} style={{ marginBottom: "10px" }}>
          <Link to={`/attendance/${list.id}`}>
            <Button variant="secondary">{list.name}</Button>
          </Link>

          
        </div>
      ))}
      <Link to="/students-list">
  <Button variant="secondary">Tous les élèves</Button>
</Link>
</div> 
    </div>
  );
}

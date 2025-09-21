import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAttendanceHistory } from "../../../shared/api/pdfApi";

export async function generatePdf(listName, students, listId) {
  // 1. Sauvegarder l’historique
  const date = await saveAttendanceHistory(listId, listName, students);

  // 2. Générer le PDF
  const docPdf = new jsPDF();
  docPdf.text(`Liste d'appel – ${listName} (${date})`, 14, 15);

  const tableData = students.map((s) => [
    s.lastName,
    s.firstName,
    s.class || "",
    s.roomNumber || "",
    s.morning ? "✔" : "",
    s.evening ? "✔" : "",
  ]);

  docPdf.autoTable({
    head: [["Nom", "Prénom", "Classe", "Chambre", "Matin", "Soir"]],
    body: tableData,
    startY: 20,
  });

  docPdf.save(`${listName}_${date}.pdf`);
}

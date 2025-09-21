import React from "react";
import { generatePdf } from "@features/pdf-export/model/attendancePdf";
import Button from "@shared/ui/Button";

export default function AttendancePdfButton({ listName, students, listId }) {
  return (
    <Button onClick={() => generatePdf(listName, students, listId)}>
      Exporter en PDF
    </Button>
  );
}

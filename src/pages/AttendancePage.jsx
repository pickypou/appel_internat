import React from "react";
import { useParams } from "react-router-dom";
import AttendanceList from "../components/AttendanceList";

export default function AttendancePage() {
  const { listId } = useParams();
  return (
    <div>
      <AttendanceList listId={listId} />
    </div>
  );
}

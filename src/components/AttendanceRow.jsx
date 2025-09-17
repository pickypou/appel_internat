
export default function AttendanceRow({ student, toggleAttendance }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
      <span>{student.firstName} {student.lastName} - {student.class} - {student.roomNumber}</span>
      <input type="checkbox" checked={student.morning} onChange={() => toggleAttendance(student.id, "morning")} /> Matin
      <input type="checkbox" checked={student.evening} onChange={() => toggleAttendance(student.id, "evening")} /> Soir
    </div>
  );
}

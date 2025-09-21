export default function AttendanceRow({ student, onToggle }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
      <span>
        {student.firstName} {student.lastName} - {student.className} - {student.roomNumber}
      </span>
      <label>
        <input
          type="checkbox"
          checked={student.morning}
          onChange={() => onToggle(student.id, "morning")}
        />{" "}
        Matin
      </label>
      <label>
        <input
          type="checkbox"
          checked={student.evening}
          onChange={() => onToggle(student.id, "evening")}
        />{" "}
        Soir
      </label>
    </div>
  );
}

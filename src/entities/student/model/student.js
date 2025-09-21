// Représentation d’un élève
export function createStudent({ id, firstName, lastName, className, roomNumber }) {
  return {
    id,
    firstName,
    lastName,
    className,
    roomNumber,
    morning: false,
    evening: false,
  };
}

// Fonction métier pour toggler la présence
export function toggleAttendanceState(student, field) {
  return {
    ...student,
    [field]: !student[field],
  };
}

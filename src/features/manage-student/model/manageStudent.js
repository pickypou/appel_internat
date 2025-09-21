import { createStudent } from "@shared/api/studentApi";

export async function addStudent(student) {
  try {
    await createStudent(student);
    return { success: true };
  } catch (err) {
    console.error("Erreur addStudent:", err);
    return { success: false, error: err };
  }
}

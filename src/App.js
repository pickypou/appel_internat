import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard/ui/Dashboard.jsx";
import CreateListPage from "./pages/createListPage/ui/createListPage.jsx";
import AttendancePage from "./pages/attendancePage/ui/attendancePage.jsx";
import StudentListPage from "./pages/studentListPage/ui/StudentListPage.jsx";

// Styles
import "./app/styles/general.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-list" element={<CreateListPage />} />
      <Route path="/attendance/:listId" element={<AttendancePage />} />
      <Route path="/students-list" element={<StudentListPage />} />
    </Routes>
  );
}

export default App;

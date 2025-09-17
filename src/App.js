import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateListPage from "./pages/CreateListPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-list" element={<CreateListPage />} />
        <Route path="/attendance/:listId" element={<AttendancePage />} />
      </Routes>
   
  );
}

export default App;

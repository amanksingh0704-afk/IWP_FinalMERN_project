import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import NewComplaintPage from "./pages/NewComplaintPage";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*<Navbar />*/}
        <div className="pages">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/warden-dashboard" element={<WardenDashboard />} />
            <Route path="/new-complaint" element={<NewComplaintPage />} />
            <Route path="/complaint/:id" element={<ComplaintDetailPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

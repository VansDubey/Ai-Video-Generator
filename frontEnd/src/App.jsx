import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import HomePage from './Pages/HomePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>

  );
}

export default App;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KYCVerification from './components/KYCVerification';
import KYCComplete from './pages/KYCComplete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/kyc" />} />
        <Route path="/kyc" element={<KYCVerification />} />
        <Route path="/kyc-complete" element={<KYCComplete />} />
        
      </Routes>
    </Router>
  );
}

export default App;
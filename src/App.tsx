import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PlaceLabeling from './pages/PlaceLabeling';
import { User } from 'firebase/auth';
import { LoadScript } from '@react-google-maps/api';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.authStateListener((currentUser: User|null) => {
        setLoading(false);
    });

    return () => unsubscribe();

  }, []);


  if (loading || !process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places", "maps"]}>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" 
            
            element={auth.getCurrentUser()!==null ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" 
           
            element={auth.getCurrentUser()!==null ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" 
            
            element={auth.getCurrentUser()&&auth.getCurrentUser()!=null ? <Dashboard /> : <Navigate to="/login" />} />
          <Route 
            path="/label"
            
            element={auth.getCurrentUser()!==null ? <PlaceLabeling /> : <Navigate to="/login" />} />
          <Route path="/" element={
            <Navigate to={auth.getCurrentUser()!=null ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </LoadScript>
    </Router>
  );
}

export default App;

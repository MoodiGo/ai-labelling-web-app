import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigation } from 'react-router-dom';
import { auth } from './firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PlaceLabeling from './pages/PlaceLabeling';
import { userDataService } from './services/user_data';
import { UserInfo } from './models/UserInfo';

function App() {
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigation();

  useEffect(() => {
    
    const unsubscribe = auth.authStateListener((currentUser) => {
      setLoading(false);
    });


    new Promise<void>((resolve, reject) => {
      // Prevent multiple loads
      if (typeof window.google !== "undefined") {
        resolve();
        return;
      }
  
      const existingScript = document.getElementById("google-maps");
  
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyDuDgx-SdhssZJhnPUDJcVM24olMCobiI8"}&libraries=places`;
        script.id = "google-maps";
        script.async = true;
        script.defer = true;
  
        script.onload = () => resolve();
        script.onerror = () => reject("Failed to load Google Maps script");
  
        document.head.appendChild(script);
      } else {
        resolve(); // script is already loading or loaded
      }
    });


    return () => unsubscribe();

  }, []);


  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
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
    </Router>
  );
}

export default App;

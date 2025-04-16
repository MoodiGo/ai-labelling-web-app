import { useState, useEffect, useCallback } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { MockPlacesApiService, PlacesApiService } from '../services/places_api';
import { LoadScript } from '@react-google-maps/api';
import { userDataService } from '../services/user_data';
import { UserInfo } from '../models/UserInfo';

interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  types: string[];
  photos?: { photo_reference: string }[];
  // Other Google Places API fields
}

const PlaceLabeling = () => {
  const mock = true;
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [currentPlace, setCurrentPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [placePicUrl, setPlacePicUrl] = useState<string | null>(null);

  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [vibes, setVibes] = useState<string[]>(['', '', '']);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [placesLabeled, setPlacesLabeled] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    
    
  }, [navigate]);

  useEffect(() => {
    const initSession = async () => {
      if (!auth.getCurrentUser()) {
        navigate('/login');
        return;
      }

      try {
        const placesService = new PlacesApiService();
        await placesService.search();
        setPlaces(placesService.resultsList);
        setLoading(false);
        setVibes([]);
      } catch (error) {
        console.error("Error initializing session:", error);
        setError('Failed to initialize session');   
      }
    };

    const initSessionMock = async () => {
      try {
        const placesService = new MockPlacesApiService();
        await placesService.search();
        setPlaces(placesService.resultsList);
        setLoading(false);
        setVibes([]);
      } catch (error) {
        console.log("Error initializing session:", error);
      }
    }

    function setUser() {
      if(auth.getCurrentUser()!==null) {
        UserInfo.getFromDb(auth.getCurrentUser()!.uid!)
        .then((userInfo) => {
          userDataService.setUserInfo(userInfo!);      
          console.log(userDataService.getUserInfo()?.id);
          !mock ? initSession() : initSessionMock();
        });
      }
    }
    setUser();
  }, []);

  useEffect(() => {
    setCurrentPlace(places[currentPlaceIndex]);
  }, [places, currentPlaceIndex]);


  useEffect(() => {
    if (currentPlace) {
      getPicture();
    }
  }, [currentPlace]);
  
  const getPicture = useCallback(async () => {
    setPlacePicUrl(await PlacesApiService.getPictureUrl(currentPlace!));
  }, [currentPlace])

  const handleVibeChange = (index: number, value: string) => {
    const newVibes = [...vibes];
    newVibes[index] = value;
    setVibes(newVibes);
  };

  const handleSubmit = async () => {
    if (!auth.getCurrentUser() || !sessionId) return;
    
    try {
      const currentPlace = places[currentPlaceIndex];
      const filteredVibes = vibes.filter(vibe => vibe.trim() !== '');
      
      if (filteredVibes.length === 0) {
        setError('Please enter at least one vibe');
        return;
      }
      
      // Save the labeling data
      await addDoc(collection(db, 'labelings'), {
        userId: auth.getCurrentUser()!.uid,
        sessionId,
        placeId: currentPlace.place_id,
        placeName: currentPlace.name,
        placeVicinity: currentPlace.vicinity,
        placeTypes: currentPlace.types,
        vibes: filteredVibes,
        timestamp: Timestamp.now()
      });
      
      // Update session
      const newPlacesLabeled = placesLabeled + 1;
      await updateDoc(doc(db, 'sessions', sessionId), {
        placesLabeled: newPlacesLabeled
      });
      
      setPlacesLabeled(newPlacesLabeled);
      
      // Reset vibes for next place
      setVibes(['', '', '']);
      
      // Move to next place or finish
      if (newPlacesLabeled >= 25 || currentPlaceIndex >= places.length - 1) {
        navigate('/dashboard');
      } else {
        setCurrentPlaceIndex(currentPlaceIndex + 1);
      }
      
      setError('');
    } catch (error) {
      console.error("Error submitting label:", error);
      setError('Failed to submit label');
    }
  };
  

  if (loading || !currentPlace || currentPlace===null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-xl">No places available for labeling.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Place Labeling</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {placesLabeled} / 25 places labeled
            </span>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              {currentPlace!.photos && currentPlace!.photos.length > 0 ? (
                <img
                  src={mock ? "https://lh3.googleusercontent.com/places/ANXAkqHNmsWc59aKgwMc3uoAwcDtL-GUbUcAZiyc-0-M-WE7LRrNcNqeL6jEx5qiLTdRpx1gx6tqpLDFqS5Y5B9q00wCUwVsmEIjVIo"
                    : placePicUrl??""}
                  alt={currentPlace!.name}
                  className="object-cover w-full h-64 rounded-lg shadow"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
              )}
            </div>
            <h2 className="text-xl font-semibold">{currentPlace!.name}</h2>
            <p className="text-gray-600">{currentPlace!.vicinity}</p>
            <div className="flex flex-wrap mt-2 gap-1">
              {currentPlace!.types?.map((type, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                >
                  {type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          
          {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
          
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium">What vibes/moods do you associate with this place?</h3>
            <p className="mb-4 text-sm text-gray-600">Enter up to 3 vibes or moods that come to mind when you think of this place.</p>
            
            <div className="space-y-3">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label htmlFor={`vibe-${index}`} className="block text-sm font-medium text-gray-700">
                    Vibe/Mood {index + 1}
                  </label>
                  <input
                    id={`vibe-${index}`}
                    value={vibes[index]}
                    onChange={(e) => handleVibeChange(index, e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter vibe/mood ${index + 1}`}
                    maxLength={30}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit & Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  )
  ;
};

export default PlaceLabeling;

import { useState, useEffect, useCallback } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { MockPlacesApiService, PlacesApiService } from '../services/places_api';
import { userDataService } from '../services/user_data';
import { UserInfo } from '../models/UserInfo';
import { LabelingSessionService } from '../services/labeling_session_service';

const PlaceLabeling = () => {
  const mock = true;
  const mockPlaceImageUrl = ["https://lh3.googleusercontent.com/places/ANXAkqHNmsWc59aKgwMc3uoAwcDtL-GUbUcAZiyc-0-M-WE7LRrNcNqeL6jEx5qiLTdRpx1gx6tqpLDFqS5Y5B9q00wCUwVsmEIjVIo"];
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [currentPlace, setCurrentPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [placePicUrl, setPlacePicUrl] = useState<string[]>([]);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);
  const [vibes, setVibes] = useState<string[]>(['', '', '']);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasBeenThere, setHasBeenThere] = useState<boolean>(false);
  const [session, setSession] = useState<LabelingSessionService | null>(null);
  const [placesLabeled, setPlacesLabeled] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

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
        setVibes(['', '', '']);
        setSession(new LabelingSessionService());
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
        setVibes(['', '', '']);
        setSession(new LabelingSessionService());
      } catch (error) {
        console.error("Error initializing session:", error);
      }
    };

    const setUser = () => {
      const user = auth.getCurrentUser();
      if (user && user.uid) {
        UserInfo.getFromDb(user.uid).then((userInfo) => {
          if (userInfo) {
            userDataService.setUserInfo(userInfo);
            !mock ? initSession() : initSessionMock();
          }
        });
      }
    };

    setUser();
  }, [navigate]);

  useEffect(() => {
    setCurrentPlace(places[currentPlaceIndex] ?? null);
  }, [places, currentPlaceIndex]);

  useEffect(() => {
    if (currentPlace) {
      getPicture();
    }
  }, [currentPlace]);

  const getPicture = useCallback(async () => {
    if (!currentPlace) return;
    const urls = await PlacesApiService.getPictureUrl(currentPlace);
    setPlacePicUrl(urls);
  }, [currentPlace]);

  const handleVibeChange = (index: number, value: string) => {
    const newVibes = [...vibes];
    newVibes[index] = value;
    setVibes(newVibes);
  };

  const skipPlace = () => {
    setCurrentPlaceIndex((prev) => prev + 1);
    setVibes(['', '', '']);
    setHasBeenThere(false);
    setError('');
    if(!currentPlace || !currentPlace.place_id) return;
    session?.skipPlace(currentPlace.place_id);
  };

  const submitReview = async () => {
    const filteredVibes = vibes.filter((vibe) => vibe.trim() !== '');
    if (filteredVibes.length === 0) {
      setError('Please enter at least one vibe');
      return;
    }

    const user = auth.getCurrentUser();
    const userInfo = userDataService.getUserInfo();

    if (!user || !userInfo || !session) return;
    const place = places[currentPlaceIndex];
    if (!place.place_id) {
      setError('Invalid place');
      return;
    }

    const success = await session.labelPlace(place.place_id, hasBeenThere, filteredVibes);
    if (success) {
      setPlacesLabeled((prev) => prev + 1);
      setCurrentPlaceIndex((prev) => prev + 1);
      setVibes(['', '', '']);
      setHasBeenThere(false);
      setError('');
    } else {
      setError('Failed to submit review');
    }
  };

  if (loading || !currentPlace) {
    return <div className="flex items-center justify-center h-screen text-gray-700">Loading...</div>;
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-xl text-gray-700">No places available for labeling.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold text-gray-900">🌍 Place Labeling</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              {placesLabeled} / 25 labeled
            </span>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-4xl">
        <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-8">

          {/* Image Section */}
          <div className="relative w-full h-72 rounded-lg overflow-hidden">
            {currentPlace.photos && placePicUrl.length > 0 ? (
              <>
                <img
                  src={mock ? mockPlaceImageUrl[0] : placePicUrl[0]}
                  alt={currentPlace.name}
                  className="object-cover w-full h-full transition-all duration-500"
                />
                <div className="absolute inset-0 flex justify-between items-center px-4">
                  <button
                    onClick={() => {
                      const prev = (placePicUrl.length + placePicUrl.indexOf(placePicUrl[0]) - 1) % placePicUrl.length;
                      setPlacePicUrl([ ...placePicUrl.slice(prev), ...placePicUrl.slice(0, prev) ]);
                    }}
                    className="p-2 bg-white bg-opacity-60 backdrop-blur-sm rounded-full hover:bg-opacity-90 transition"
                  >
                    &#8249;
                  </button>
                  <button
                    onClick={() => {
                      const next = (placePicUrl.indexOf(placePicUrl[0]) + 1) % placePicUrl.length;
                      setPlacePicUrl([ ...placePicUrl.slice(next), ...placePicUrl.slice(0, next) ]);
                    }}
                    className="p-2 bg-white bg-opacity-60 backdrop-blur-sm rounded-full hover:bg-opacity-90 transition"
                  >
                    &#8250;
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* Info Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentPlace.name}</h2>
            <p className="text-gray-500">{currentPlace.vicinity}</p>
            <div className="flex flex-wrap mt-3 gap-2">
              {currentPlace.types?.map((type, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={hasBeenThere}
              onChange={(e) => setHasBeenThere(e.target.checked)}
              id="beenThere"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="beenThere" className="text-sm text-gray-700 font-medium">I've been here before</label>
          </div>

          {/* Vibes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">✨ What vibes/moods do you associate with this place?</h3>
            <p className="text-sm text-gray-500 mb-4">Enter up to 3 moods you feel when thinking about this place.</p>
            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  value={vibes[index]}
                  onChange={(e) => handleVibeChange(index, e.target.value)}
                  placeholder={`Vibe/Mood ${index + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  maxLength={30}
                />
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={skipPlace}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Skip this place
            </button>
            <button
              onClick={submitReview}
              className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Submit & Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceLabeling;

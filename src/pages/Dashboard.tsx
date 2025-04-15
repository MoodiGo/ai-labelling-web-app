"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useNavigate } from "react-router-dom"
import { userInfo } from "os"

const Dashboard = () => {
  const [userName, setUserName] = useState("")
  const [sessionActive, setSessionActive] = useState(false)
  const [placesLabeled, setPlacesLabeled] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      if (!auth.getCurrentUser()) return

      try {
        // Get current date at midnight
        // const today = new Date()
        // today.setHours(0, 0, 0, 0)

        // Query for today's session
        // const sessionQuery = query(
        //   collection(db, "sessions"),
        //   where("userId", "==", auth.getCurrentUser()!.uid),
        //   where("date", ">=", Timestamp.fromDate(today)),
        // )

        // const sessionSnapshot = await getDocs(sessionQuery)

        // if (!sessionSnapshot.empty) {
        //   const sessionData = sessionSnapshot.docs[0].data()
        //   setSessionActive(true)
        //   setPlacesLabeled(sessionData.placesLabeled || 0)
        // }

        // // Get user data
        // const userDoc = await getDocs(query(collection(db, "users"), where("email", "==", auth.getCurrentUser()!.email)))

        // if (!userDoc.empty) {
        //   const userData = userDoc.docs[0].data()
        //   setUserName(userData.location || "User")
        // }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleSignOut = async () => {
    try {
      auth.signOut();
      // await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const startLabeling = () => {
    navigate("/label")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Place Labeling Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-6 text-xl font-semibold">Welcome, {userName}</h2>

          <div className="p-4 mb-6 bg-gray-50 rounded-md">
            <h3 className="mb-2 text-lg font-medium">Today's Session</h3>
            {sessionActive ? (
              <div>
                <p>You've labeled {placesLabeled} places today.</p>
                <p className="mt-2 text-sm text-gray-600">
                  {placesLabeled >= 25
                    ? "You've reached the maximum number of places for today."
                    : `You can label ${25 - placesLabeled} more places today.`}
                </p>
              </div>
            ) : (
              <p>You haven't started labeling places today.</p>
            )}
          </div>

          <button
            onClick={startLabeling}
            disabled={placesLabeled >= 25}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              placesLabeled >= 25 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {sessionActive ? "Continue Labeling" : "Start Labeling"}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

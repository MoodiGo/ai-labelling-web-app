export interface User {
    uid: string
    email: string
    location?: string
  }
  
  export interface Session {
    id: string
    userId: string
    date: Date
    placesLabeled: number
  }
  
  export interface PlaceLabeling {
    id?: string
    userId: string
    sessionId: string
    placeId: string
    placeName: string
    placeVicinity: string
    placeTypes: string[]
    vibes: string[]
    timestamp: Date
  }
  
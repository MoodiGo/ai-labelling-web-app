import { PlaceType } from "../types/PlaceTypes";
import { userDataService } from "./user_data";
import { result } from '../mock/google_places_api';

export interface iPlacesApiService {
    instance: google.maps.places.PlacesService | null;
    refLat: number | null;
    refLng: number | null;
    resultsList: google.maps.places.PlaceResult[];
    userLabeledPlaces: string[];

    search(): Promise<void>;
}

interface PlaceDetailsToShow {
  pictures: string[];
  url: string;
}

export class PlacesApiService {
    instance: google.maps.places.PlacesService | null;
    refLat: number | null;
    refLng: number | null;
    resultsList: google.maps.places.PlaceResult[];
    userLabeledPlaces: string[];

    static _maxItemsPerDay = 2;


    static getInstance(): Promise<PlacesApiService | null> {
      return userDataService.getUserInfo()
      .then((userinfo) => {
          if(!userinfo) {
              console.error("User info not found.");
              return null;
          }

          let inst = new PlacesApiService();
          inst.refLat = userinfo?.location_lat || 0;
          inst.refLng = userinfo?.location_lon || 0;
          inst.resultsList = [];
          inst.userLabeledPlaces = userinfo?.places_reviewed_ids?.concat(userinfo?.skipped_places_ids) || [];
  
          // Create a dummy map element to use the PlacesService (required)
          const dummyMap = document.createElement("div");
          if (!window.google || !window.google.maps) {
              throw new Error("Google Maps JavaScript API is not loaded. Ensure it is properly included in your HTML.");
          }
          const map = new google.maps.Map(dummyMap);
  
          if (map) {
            inst.instance = new google.maps.places.PlacesService(map);
          }

          return inst;
      })
      .catch((error) => {
          console.error("Error getting user info:", error);
          return null;
      });
    }

    constructor() {
        this.instance = null;
        this.refLat = 0;
        this.refLng = 0;
        this.resultsList = [];
        this.userLabeledPlaces = [];
    }

    async search(): Promise<void> {
        if(!this.instance || this.instance === null || this.refLat === null || this.refLng === null) {
            console.error("PlacesService instance is not initialized.");
            return;
        }
        
        let types = Object.values(PlaceType) as string[]; // Get all enum values as an array
        types = types.sort(() => Math.random() - 0.5);
        const location = new google.maps.LatLng(this.refLat!,this.refLng);

        for (const type of types) {
            if (this.resultsList.length >= PlacesApiService._maxItemsPerDay) {
              console.warn("Reached max of "+ PlacesApiService._maxItemsPerDay + " results, stopping search.");
              break;
            }
            await this._searchByType(type, location);
          }

        // randomize the order of the results and limit to 2
        this.resultsList = this.resultsList.sort(() => Math.random() - 0.5).slice(0, PlacesApiService._maxItemsPerDay);

        console.info("Final results list:", this.resultsList);
    }

    

    static async getDetails(place: google.maps.places.PlaceResult): Promise<PlaceDetailsToShow> {
      const instance = new google.maps.places.PlacesService(document.createElement("div"));
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: place!.place_id!,
        fields: ["photos", "url"],
      };

      return await new Promise<PlaceDetailsToShow>((resolve) => {
        let photoUrl = [] as string[];
        let result = {} as PlaceDetailsToShow;
        instance.getDetails(request, (p) => {
          if(!p || !p.photos || p.photos.length === 0) {
            result.pictures = [];
            result.url = p?.url || "";
            resolve(result);
          }
          let photos = p!.photos ?? [];
          let count = photos.length < 3 ? photos.length : 3;  

          for(let i = 0; i < count; i++) {
            const url = photos[i].getUrl({} as google.maps.places.PhotoOptions);
            console.log("Photo URL:", url);
            photoUrl.push(url);
          }

          result.pictures = photoUrl;
          result.url = p?.url || "";
          resolve(result);
        });
      });
    }

    async _searchByType(type: string, location: google.maps.LatLng): Promise<void> {
        if (this.resultsList.length >= PlacesApiService._maxItemsPerDay) {
          console.warn("Already found " + PlacesApiService._maxItemsPerDay + " places, stopping search.");
          return;
        }
      
        const request: google.maps.places.PlaceSearchRequest = {
          location,
          radius: 10000, // in meters
          type: type,
        };
      
        try {
          const results = await this._fetchNearbyPlaces(request);
      
          // Filter out already-labeled places before adding
          const newResults = results.filter(
            (place) => !this.userLabeledPlaces.includes(place.place_id!)
          );
      
          // Avoid going over 2 results
          const spaceLeft = PlacesApiService._maxItemsPerDay - this.resultsList.length;
          const toAdd = newResults.slice(0, spaceLeft);
      
          this.resultsList.push(...toAdd);
        } catch (error) {
          console.warn(`Error fetching places of type ${type}:`, error);
        }
    }
      
    // Helper function to convert nearbySearch into a promise
    private _fetchNearbyPlaces(
      request: google.maps.places.PlaceSearchRequest
    ): Promise<google.maps.places.PlaceResult[]> {
      return new Promise((resolve, reject) => {
        this.instance!.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error("Failed to fetch places or no results found."));
          }
        });
      });
    }
      
}

export class MockPlacesApiService {
    instance: google.maps.places.PlacesService | null;
    refLat: number | null;
    refLng: number | null;
    resultsList: google.maps.places.PlaceResult[];
    userLabeledPlaces: string[];

    constructor() {
        this.instance = null;
        this.refLat = 0;
        this.refLng = 0;
        this.resultsList = [];
        this.userLabeledPlaces = [];
    }

    async search(): Promise<void> {
        // No-op for mock service
        return new Promise((resolve) => {
          setTimeout(() => {
            this.resultsList = result(); // Use mock data
            resolve();
          }, 1000);
      });
    }
}
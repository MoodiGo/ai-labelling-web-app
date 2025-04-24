import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";

export class UserInfo {
    id?: string;
    count_places_labeled_last_session: number;
    skipped_places_ids: string[];
    count_places_labeled_total: number;
    firebase_uid: string;
    last_session_at: Date | null;
    name: string;
    places_reviewed_ids: string[];
    location_lat?: number;
    location_lon?: number;

    constructor(firebase_uid: string, 
        count_places_last_session?: number, 
        count_places_total?: number, 
        last_session_at?: Date | null, 
        name?: string, 
        places_reviewed_ids?: string[],
        id?: string,
        location_lat?: number,
        location_lon?: number,
        skipped_places_ids?: string[]
    ) {
        this.firebase_uid = firebase_uid;
        this.count_places_labeled_last_session = count_places_last_session || 0;
        this.count_places_labeled_total = count_places_total || 0;
        this.last_session_at = last_session_at !== undefined ? last_session_at : new Date();
        this.name = name || '';
        this.places_reviewed_ids = places_reviewed_ids || [];
        this.id = id || undefined;
        this.location_lat = location_lat || undefined;
        this.location_lon = location_lon || undefined;
        this.skipped_places_ids = skipped_places_ids || [];
    }

    _incrementPlacesLabeled() {
        this.count_places_labeled_total += 1;
    }

    async skipPlace(placeId: string) : Promise<boolean> { 
        try {
            console.log("skipped places_ids", this.skipped_places_ids);
            if (!this.skipped_places_ids.includes(placeId)) {
                console.log("Skipping place", placeId);
                this.skipped_places_ids.push(placeId);
                await this.sendToDb();
                return true;
            }
            console.log("Place already skipped", placeId);
            return false;
        } catch (error) {
            console.error("Error skipping place", error);
            return false;
        }
    }

    async addReviewedPlace(placeId: string, reviewed_at: Date, newCountInSession: number) : Promise<boolean> {
        try {
            if (!this.places_reviewed_ids.includes(placeId)) {
                this.places_reviewed_ids.push(placeId);
                this.last_session_at = reviewed_at;
                this.count_places_labeled_last_session = newCountInSession;
                this._incrementPlacesLabeled();
                await this.sendToDb();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error adding reviewed place", error);
            return false;
        }
    }
    
    getData(){
        return {
            count_places_labeled_last_session: this.count_places_labeled_last_session,
            count_places_labeled_total: this.count_places_labeled_total,
            firebase_uid: this.firebase_uid,
            last_session_at: this.last_session_at,
            name: this.name,
            places_reviewed_ids: this.places_reviewed_ids,
            location_lat: this.location_lat,
            location_lon: this.location_lon,
            skipped_places_ids: this.skipped_places_ids
        }
    }

    async sendToDb(){
        try {
            const collectionName = 'users';
            if(this.id){
                // update
                const docRef = doc(db, collectionName, this.id);
                await setDoc(docRef, this.getData(), { merge: true });
                return true;
            }else{
                const col = collection(db, collectionName);
                // create new
                await addDoc(col, this.getData());
                return true;
            }
        } catch (error) {
            console.error("Error sending user info to db", error);
            return false;
        }
    }

    static async getFromDb(firebase_uid: string) : Promise<UserInfo | null>{
        const collectionName = 'users';
        try{
            const docRef = collection(db, collectionName);

            const q = query(docRef, where("firebase_uid", "==", firebase_uid));
            const documents = await getDocs(q);
            if(documents.empty){
                console.warn("No user found in db", firebase_uid);
                return null;
            }

            const results = documents.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data()
             } as UserInfo));

             if(results.length === 0){
                console.warn("No user found in db", firebase_uid);
                return null;
            }

            const document = results[0];
            return new UserInfo(
                document.firebase_uid,
                document?.count_places_labeled_last_session,
                document?.count_places_labeled_total,
                document?.last_session_at,
                document?.name,
                document?.places_reviewed_ids,
                document.id,
                document?.location_lat,
                document?.location_lon,
                document?.skipped_places_ids
            );
        }catch(er){
            console.error("Error getting user info from db", er);
            return null;
        }
    }
}


import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";

export class UserInfo {
    id?: string;
    count_places_labeled_last_session: number;
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
        location_lon?: number
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
    }

    _incrementPlacesLabeled() {
        this.count_places_labeled_last_session += 1;
        this.count_places_labeled_total += 1;
    }

    async addReviewedPlace(placeId: string) : Promise<boolean> {
        if (!this.places_reviewed_ids.includes(placeId)) {
            this.places_reviewed_ids.push(placeId);
            this._incrementPlacesLabeled();
            await this.sendToDb();
            return true;
        }
        return false;
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
            location_lon: this.location_lon
        }
    }

    async sendToDb(){
        const collectionName = 'users';
        if(this.id){
            // update
            const docRef = doc(db, collectionName, this.id);
            await setDoc(docRef, this.getData(), { merge: true });
        }else{
            const col = collection(db, collectionName);
            // create new
            await addDoc(col, this.getData());
        }
    }

    static async getFromDb(firebase_uid: string) : Promise<UserInfo | null>{
        const collectionName = 'users';
        try{
            const docRef = collection(db, collectionName);

            console.log("Getting user info from db", docRef.id, firebase_uid, docRef.path)

            // todo - get doc with where clause
            const q = query(docRef, where("firebase_uid", "==", firebase_uid));
            const documents = await getDocs(q);
            if(documents.empty){
                console.log("No user found in db", firebase_uid);
                return null;
            }

            const results = documents.docs.map(doc => ({ 
                id: doc.id,
                ...doc.data()
             } as UserInfo));

             if(results.length === 0){
                console.log("No user found in db", firebase_uid);
                return null;
            }

            const document = results[0];
            console.log("User found in db", document, firebase_uid);
            return new UserInfo(
                document.firebase_uid,
                document?.count_places_labeled_last_session,
                document?.count_places_labeled_total,
                document?.last_session_at,
                document?.name,
                document?.places_reviewed_ids,
                document.id,
                document?.location_lat,
                document?.location_lon
            );
        }catch(er){
            console.error("Error getting user info from db", er);
            return null;
        }
    }
}


import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export class Review {
    id?: string;
    reviewer_id: string;
    place_id: string;
    reviewed_at: Date;
    vibes: string[];
    has_been_there: boolean;

    constructor(
        id: string,
        reviewer_id: string,
        place_id: string,
        reviewed_at: Date,
        vibes: string[],
        has_been_there: boolean,
    ) {
        this.id = id;
        this.reviewer_id = reviewer_id;
        this.place_id = place_id;
        this.reviewed_at = reviewed_at;
        this.vibes = vibes;
        this.has_been_there = has_been_there;
    }

    getData(isAdd: boolean = false) {
        
        const data = {
            id: this.id,
            reviewer_id: this.reviewer_id,
            place_id: this.place_id,
            reviewed_at: this.reviewed_at,
            vibes: this.vibes,
            has_been_there: this.has_been_there
        };

        if(isAdd){
            delete data.id;
        }
        return data;
    }

    async sendToDb() : Promise<boolean> {
        const collectionName = 'reviews';
        try {
            if(this.id && this.id !== ''){
                // update
                const docRef = doc(db, collectionName, this.id);
                await setDoc(docRef, this.getData(), { merge: true });
                return true;
            }else{
                // create new
                const col = collection(db, collectionName);
                await addDoc(col, this.getData(true));
                return true;
            }
        } catch (error) {
            console.error("Error sending review to Firestore:", error);
            return false;
        }
    }
}
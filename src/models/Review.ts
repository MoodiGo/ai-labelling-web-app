import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export class Review {
    id: string;
    reviewer_id: string;
    place_id: string;
    text: string;
    rating: number;
    reviewed_at: Date;
    vibes: string[];
    has_been_there: boolean;

    constructor(
        id: string,
        reviewer_id: string,
        place_id: string,
        text: string,
        rating: number,
        reviewed_at: Date,
        vibes: string[],
        has_been_there: boolean
    ) {
        this.id = id;
        this.reviewer_id = reviewer_id;
        this.place_id = place_id;
        this.text = text;
        this.rating = rating;
        this.reviewed_at = reviewed_at;
        this.vibes = vibes;
        this.has_been_there = has_been_there;
    }

    getData() {
        return {
            id: this.id,
            reviewer_id: this.reviewer_id,
            place_id: this.place_id,
            text: this.text,
            rating: this.rating,
            reviewed_at: this.reviewed_at,
            vibes: this.vibes,
            has_been_there: this.has_been_there
        };
    }

    async sendToDb() {
        const collectionName = 'reviews';
        if(this.id){
            // update
            const docRef = doc(db, collectionName, this.id);
            await setDoc(docRef, this.getData(), { merge: true });
        }else{
            // create new
            const col = collection(db, collectionName);
            await addDoc(col, this.getData());
        }
    }
}
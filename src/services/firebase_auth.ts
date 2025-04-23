import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";

export class FirebaseAuth {
    private auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }
    
    authStateListener(callback: (user: any) => void): () => void {
        return this.auth.onAuthStateChanged((user) => {
            if (user) {
                callback(user);
            } else {
                callback(null);
            }
        }
        );
    }

    signup(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, email, password)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }

    async signIn(email: string, password: string): Promise<void> {
        try{
            if(!this.auth) {
                throw new Error("Firebase Auth is not initialized");
            }

            // Check if the user is already signed in
            const user = this.auth.currentUser;
            if (user) {
                return Promise.resolve();
            }

            if(!email || !password) {
                return Promise.reject(new Error("Email and password are required"));
            }
            
            if(email === "" || password === "") {
                return Promise.reject(new Error("Email and password cannot be empty"));
            }

            // If not, proceed with sign-in
            await signInWithEmailAndPassword(this.auth, email, password);
            Promise.resolve();
        }catch (error) {
            // Handle error (e.g., log it, show a message to the user, etc.)
            console.error("Error signing in:", error);
            return Promise.reject(error);
        }
    }
    
    signOut(): Promise<void> {
        try {
            // Check if the user is already signed out
            const user = this.auth.currentUser;
            if (!user) {
                return Promise.resolve();
            }

            // If not, proceed with sign-out
            return this.auth.signOut();
        } catch (error) {
            // Handle error (e.g., log it, show a message to the user, etc.)
            console.error("Error signing out:", error);
            return Promise.reject(error);
        }
    }

    isUserSignedIn(): boolean {
        return this.auth.currentUser !== null;
    }

    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }

}
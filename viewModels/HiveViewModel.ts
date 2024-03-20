import { notes } from '@/data/hiveData';
import { HiveModel } from "@/models/hiveModel";
import { action, makeAutoObservable, runInAction } from "mobx";
import { filterData, hiveListData } from "../data/hiveData"; 
import { HiveNote } from "@/models/note";
import { auth, db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { NotificationPreference, NotificationType } from '@/constants/Notifications';
import { notificationPreferences } from '@/data/notificationData';

class HiveViewModel {
    hives: HiveModel[] = [];
    filters: string[] = [];
    selectedHive?: HiveModel
    selectedNote?: HiveNote

    constructor() {
        makeAutoObservable(this);
    }

    @action async fetchFilters() {
        try {
        const userId = auth.currentUser?.uid
        console.log("user id: ", userId)
        const userDocRef = doc(db, `users/${userId}`);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            runInAction(() => {
            this.filters = userDoc.data().filters || [];
            });} 
            else {
            console.log("User document not found");
            }
            console.log("this.filters: " ,this.filters)
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    }

    @action async fetchHives() {
        try {
        const userId = auth.currentUser?.uid ; 
        const querySnapshot = await getDocs(collection(db, `users/${userId}/hives`));
        runInAction(() => {
            const hives = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.hiveName,
                filters: data.hiveFilter,
                latLng: data.latLng,
                // TODO DB - read notes, preferences, queen, and the latest sensor reading from DB.
                // Right now they are all dummy data.
                notes: notes,
                preferences: notificationPreferences,
                temperature: 4,
                weight: 5,
                humidity: 78,
                beeCount: 48,
                queen: {id: "abc123queenbee", dateOfBirth: new Date(Date.now())}
            } as HiveModel; 
            });
            
            this.hives = hives; 
        });

        console.log("Hives: ", this.hives)
        } catch (error) {
            console.error("Error fetching hives: ", error);
        }
    }

    addHive(hive: HiveModel) {
        this.hives.push(hive);
    }

    removeHive(hiveId: string) {
        this.hives = this.hives.filter(item => item.id !== hiveId);
    }

    numberOfHives() {
        return this.hives.length;
    }

    addFilter(filter: string) {
        this.filters.push(filter);
    }

    removeFilter(filter: string) {
        this.filters = this.filters.filter(item => item !== filter);
    }

    numberOfFilters() {
        return this.filters.length;
    }

    addSelectedHive(hive: HiveModel) {
        this.selectedHive = hive;
    }

    getSelectedHive() {
        return this.selectedHive;
    }

    getHiveFromId(hiveId: string): HiveModel | undefined {
        return this.hives.find(item => item.id === hiveId);
    }

    addSelectedNote(note: HiveNote) {
        this.selectedNote = note;
    }

    getSelectedNote() {
        return this.selectedNote;
    }

    modifyNote(noteObject: HiveNote) {
        if (this.selectedHive) {
            const noteIndex = this.selectedHive.notes.findIndex(note => note.id === noteObject.id);
            if (noteIndex !== -1) {
                this.selectedHive.notes[noteIndex] = noteObject;
            }
        }
    }

    removeNote(noteId: string) {
        if (this.selectedHive) {
            this.selectedHive.notes = this.selectedHive.notes.filter(note => note.id !== noteId);
        }
    }

    toggleNotificationPreference(type: NotificationType): void {
        if (this.selectedHive && this.selectedHive.preferences) {
            this.selectedHive.preferences[type] = !this.selectedHive.preferences[type];
        } else {
            // TODO Error handling
        }
    }
}

export const hiveViewModel = new HiveViewModel();
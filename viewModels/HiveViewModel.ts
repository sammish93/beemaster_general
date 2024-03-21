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

    @action addHive(hive: HiveModel) {
        /*
        TODO DB - Write this hive to DB. Not sure exactly about the hiveId field. Should firebase 
        generate it?
        */
        this.hives.push(hive);
    }

    @action updateHive(hiveToUpdate: HiveModel) {
        // TODO DB - Update DB for specific hive ID.
        if (hiveToUpdate) {
            const hiveIndex = this.hives.findIndex(hive => hive.id === hiveToUpdate.id);
            if (hiveIndex !== -1) {
                this.hives[hiveIndex] = hiveToUpdate;
            }
        }
    }

    @action removeHive(hiveId: string) {
        // TODO DB - Delete this hive from the DB.
        this.hives = this.hives.filter(item => item.id !== hiveId);
    }

    @action numberOfHives() {
        return this.hives.length;
    }

    @action addFilter(filter: string) {
        // TODO DB - Write this filter to the DB under the currently selected hive.
        this.filters.push(filter);
    }

    @action removeFilter(filter: string) {
        // TODO DB - Delete this filter from the user, as well as all hives that have the filter.
        this.filters = this.filters.filter(item => item !== filter);

        this.hives.forEach(hive => {
            hive.filters = hive.filters.filter(hiveFilter => hiveFilter !== filter);
        });
    }

    @action numberOfFilters() {
        return this.filters.length;
    }

    // This function is just used for when a hive card or notification is clicked on to navigate the 
    // user to the specific hive.
    @action addSelectedHive(hive: HiveModel) {
        this.selectedHive = hive;
    }

    @action getSelectedHive() {
        return this.selectedHive;
    }

    @action getHiveFromId(hiveId: string): HiveModel | undefined {
        return this.hives.find(item => item.id === hiveId);
    }

    @action getSelectedNotes() {
        return this.selectedHive?.notes;
    }

    @action addSelectedNote(note: HiveNote) {
        this.selectedNote = note;
    }

    @action getSelectedNote() {
        return this.selectedNote;
    }

    @action modifyNote(noteObject: HiveNote) {
        // TODO DB - Update DB for specific note ID under selected hive ID.
        if (this.selectedHive) {
            const noteIndex = this.selectedHive.notes.findIndex(note => note.id === noteObject.id);
            if (noteIndex !== -1) {
                this.selectedHive.notes[noteIndex] = noteObject;
            }
        }
    }

    @action toggleNoteSticky(note: HiveNote): void {
        note.isSticky = !note.isSticky;
        this.modifyNote(note)
    }

    @action
    sortNotes() {
      this.selectedHive?.notes.sort((a: HiveNote, b: HiveNote) => {
        if (Number(b.isSticky) - Number(a.isSticky) !== 0) {
          return Number(b.isSticky) - Number(a.isSticky);
        }
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
    }

    @action removeNote(noteId: string) {
        // TODO DB - Delete from DB.
        if (this.selectedHive) {
            this.selectedHive.notes = this.selectedHive.notes.filter(note => note.id !== noteId);
        }
    }

    @action toggleNotificationPreference(type: NotificationType): void {
        // TODO DB - Update DB. Note that this preference boolean isn't the global toggle for a user.
        // It's for a specific hive. E.g. user weatherNotification = true, but they might want to set 
        // inactive hive weatherNotification values to false to avoid excess alerts.
        if (this.selectedHive && this.selectedHive.preferences) {
            this.selectedHive.preferences[type] = !this.selectedHive.preferences[type];
        } else {
            // TODO Error handling
        }
    }

    @action toggleNotificationPreferenceForSpecificHive(type: NotificationType, hiveId: string): void {
        // TODO DB - Write notification type modification to DB. Note that this is for a specific hive, and 
        // not notifications for all hives (user preferences).
        const hiveToModify = this.hives.find(hive => hive.id === hiveId)

        if (hiveToModify && hiveToModify.preferences) {
            hiveToModify.preferences[type] = !hiveToModify.preferences[type];

            const hiveIndex = this.hives.findIndex(hive => hive.id === hiveId);

            if (hiveIndex !== -1) {
                this.hives[hiveIndex] = hiveToModify;
            }
        } else {
            // TODO Error handling
        }
    }
}

export const hiveViewModel = new HiveViewModel();
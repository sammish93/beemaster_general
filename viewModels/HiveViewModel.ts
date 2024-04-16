import { notes } from "@/data/hiveData";
import { HiveModel } from "@/models/hiveModel";
import { Hive } from "@/models/hive";
import { action, makeAutoObservable, runInAction } from "mobx";
import { filterData, hiveListData } from "../data/hiveData";
import { HiveNote } from "@/models/note";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  NotificationPreference,
  NotificationType,
} from "@/constants/Notifications";
import { notificationPreferences } from "@/data/notificationData";
import hive from "@/app/hive";
import { removeHive } from "@/utils/hiveUtils";

class HiveViewModel {
  hives: HiveModel[] = [];
  filters: string[] = [];
  selectedHive?: HiveModel;
  selectedNote?: HiveNote;

  constructor() {
    makeAutoObservable(this);
  }

  @action async fetchFilters() {
    try {
      const userId = auth.currentUser?.uid;
      console.log("user id: ", userId);
      const userDocRef = doc(db, `users/${userId}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        runInAction(() => {
          this.filters = userDoc.data().filters || [];
        });
      } else {
        console.log("User document not found");
      }
      console.log("this.filters: ", this.filters);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }

  @action async fetchHives() {
    try {
      const userId = auth.currentUser?.uid;
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/hives`)
      );
      runInAction(() => {
        const hives = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.hiveName,
            filters: data.hiveFilter,
            latLng: data.latLng,
            // TODO DB - read notes, preferences, queen, and the latest sensor reading from DB.
            // Right now they are all dummy data.
            notes: [],
            preferences: notificationPreferences,
            temperature: 4,
            weight: 5,
            humidity: 78,
            beeCount: 48,
            queen: { id: "abc123queenbee", dateOfBirth: new Date(Date.now()) },
          } as HiveModel;
        });

        this.hives = hives;
      });

      console.log("Hives: ", this.hives);
    } catch (error) {
      console.error("Error fetching hives: ", error);
    }
  }

  @action async fetchNotesForHive(hiveId: string) {
    console.log("notes fetch called: ", hiveId);
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const notesCollectionRef = collection(
      db,
      `users/${userId}/hives/${hiveId}/notes`
    );
    const notesSnapshot = await getDocs(notesCollectionRef);
    runInAction(() => {
      const hiveIndex = this.hives.findIndex((hive) => hive.id === hiveId);
      if (hiveIndex !== -1) {
        this.hives[hiveIndex].notes = notesSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            note: data.note,
            isSticky: data.isSticky,
            timestamp: new Date(data.timestamp.seconds * 1000),
          } as HiveNote;
        });
      }
    });
  }

  @action async addHive(hive: HiveModel) {
    /*
        TODO DB - Write this hive to DB. Not sure exactly about the hiveId field. Should firebase 
        generate it?
        
        */
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    try {
      const hiveCollectionRef = collection(db, `users/${userId}/hives`);
      const doc = await addDoc(hiveCollectionRef, {
        hiveName: hive.name,
        hiveFilter: hive.filters,
        latLng: hive.latLng,
      });
      runInAction(() => {
        this.hives.push({
          ...hive,
          id: doc.id,
        });
      });

      console.log("Hive added with ID:", doc.id);
    } catch (error) {
      console.error("Error adding hive: ", error);
    }
  }

  @action updateHive(hiveToUpdate: HiveModel) {
    // TODO DB - Update DB for specific hive ID.
    if (hiveToUpdate) {
      const hiveIndex = this.hives.findIndex(
        (hive) => hive.id === hiveToUpdate.id
      );
      if (hiveIndex !== -1) {
        this.hives[hiveIndex] = hiveToUpdate;
      }
    }
  }

  @action removeHive(hiveId: string) {
    // TODO DB - Delete this hive from the DB.
    this.hives = this.hives.filter((item) => item.id !== hiveId);
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
    this.filters = this.filters.filter((item) => item !== filter);

    this.hives.forEach((hive) => {
      hive.filters = hive.filters.filter((hiveFilter) => hiveFilter !== filter);
    });
  }

  @action numberOfFilters() {
    return this.filters.length;
  }

  @action isFilterExists(filter: string) {
    return this.filters.includes(filter);
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
    return this.hives.find((item) => item.id === hiveId);
  }

  @action getSelectedNotes() {
    return this.selectedHive?.notes;
  }

  @action addSelectedNote(note: HiveNote) {
    this.selectedNote = note;
  }

  @action getSelectedNote() {
    console.log("get selected note: ", this.selectedNote?.id);
    return this.selectedNote;
  }

  @action async modifyNote(noteObject: HiveNote) {
    if (this.selectedHive && noteObject.id) {
      const noteIndex = this.selectedHive.notes.findIndex(
        (note) => note.id === noteObject.id
      );
      if (noteIndex !== -1) {
        const currentNote = this.selectedHive.notes[noteIndex];

        if (currentNote.note !== noteObject.note) {
          noteObject.timestamp = new Date();
        }

        this.selectedHive.notes[noteIndex] = noteObject;

        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.error("User not logged in");
          return;
        }

        const noteRef = doc(
          db,
          `users/${userId}/hives/${this.selectedHive.id}/notes/${noteObject.id}`
        );

        try {
          const updateData = {
            note: noteObject.note,
            isSticky: noteObject.isSticky,
          };

          if (currentNote.note !== noteObject.note) {
            updateData.timestamp = Timestamp.fromDate(noteObject.timestamp);
          }

          await updateDoc(noteRef, updateData);
          console.log("Note updated successfully in the database");
        } catch (error) {
          console.error("Error updating note:", error);
        }
      } else {
        console.log("Note not found in the current hive");
      }
    } else {
      console.error("No hive selected or note ID missing");
    }
  }

  @action toggleNoteSticky(note: HiveNote): void {
    note.isSticky = !note.isSticky;
    this.modifyNote(note);
  }
  @action sortNotes() {
    this.selectedHive?.notes.sort((a: HiveNote, b: HiveNote) => {
      if (Number(b.isSticky) - Number(a.isSticky) !== 0) {
        return Number(b.isSticky) - Number(a.isSticky);
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }

  @action async removeNote(noteId: string) {
    if (this.selectedHive) {
      this.selectedHive.notes = this.selectedHive.notes.filter(
        (note) => note.id !== noteId
      );

      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("User not logged in");
        return;
      }

      const noteRef = doc(
        db,
        `users/${userId}/hives/${this.selectedHive.id}/notes/${noteId}`
      );

      try {
        await deleteDoc(noteRef);
        console.log("Note deleted successfully from the database");
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    } else {
      console.error("No selected hive to remove a note from");
    }
  }

  @action toggleNotificationPreference(type: NotificationType): void {
    // TODO DB - Update DB. Note that this preference boolean isn't the global toggle for a user.
    // It's for a specific hive. E.g. user weatherNotification = true, but they might want to set
    // inactive hive weatherNotification values to false to avoid excess alerts.
    if (this.selectedHive && this.selectedHive.preferences) {
      this.selectedHive.preferences[type] =
        !this.selectedHive.preferences[type];
    } else {
      // TODO Error handling
    }
  }

  @action toggleNotificationPreferenceForSpecificHive(
    type: NotificationType,
    hiveId: string
  ): void {
    // TODO DB - Write notification type modification to DB. Note that this is for a specific hive, and
    // not notifications for all hives (user preferences).
    const hiveToModify = this.hives.find((hive) => hive.id === hiveId);

    if (hiveToModify && hiveToModify.preferences) {
      hiveToModify.preferences[type] = !hiveToModify.preferences[type];

      const hiveIndex = this.hives.findIndex((hive) => hive.id === hiveId);

      if (hiveIndex !== -1) {
        this.hives[hiveIndex] = hiveToModify;
      }
    } else {
      // TODO Error handling
    }
  }
}

export const hiveViewModel = new HiveViewModel();

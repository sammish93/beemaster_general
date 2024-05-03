import { notes } from "@/data/hiveData"
import { HiveModel } from "@/models/hiveModel"
import { Hive } from "@/models/hive"
import { action, makeAutoObservable, observable, runInAction } from "mobx"
import { filterData, hiveListData } from "../data/hiveData"
import { HiveNote } from "@/models/note"
import { auth, db } from "@/firebaseConfig"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  limit,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore"
import {
  NotificationTypePreference,
  NotificationType,
} from "@/constants/Notifications"
import { notificationTypePreferences } from "@/data/notificationData"
import hive from "@/app/hive"
import { removeHive } from "@/utils/hiveUtils"
import { SensorDataList, SensorInterval } from "@/models/sensor"
import { WeightMeasurement } from "@/constants/Measurements"

class HiveViewModel {
  @observable hives: HiveModel[] = []
  filters: string[] = []
  selectedHive?: HiveModel
  selectedNote?: HiveNote
  sensorWeight?: SensorDataList
  weightSensorDataExpanded?: SensorDataList
  unsubscribeFunctions: (() => void)[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action async fetchFilters() {
    try {
      const userId = auth.currentUser?.uid
      console.log("user id: ", userId)
      const userDocRef = doc(db, `users/${userId}`)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        runInAction(() => {
          this.filters = userDoc.data().filters || []
        })
      } else {
        console.log("User document not found")
      }
      console.log("this.filters: ", this.filters)
    } catch (error) {
      console.error("Error fetching filters:", error)
    }
  }

  @action async fetchHives() {
    try {
      const userId = auth.currentUser?.uid
      console.log("this id:", userId)
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/hives`)
      )

      const hivePromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data()
        const hiveId = doc.id

        // Fetch the latest daily weight for this hive
        const weightQuery = query(
          collection(db, `users/${userId}/hives/${hiveId}/weightReadings`),
          orderBy("date", "desc"),
          limit(1)
        )

        const weightUnsubscribe = onSnapshot(weightQuery, (snapshot) => {
          if (!snapshot.empty) {
            const weightData = snapshot.docs[0].data()
            const latestWeight = weightData.weight
            console.log("Weight Data:", weightData)
            console.log("latest weight", latestWeight)

            // Update the weight for this hive in the hives array
            const index = this.hives.findIndex((hive) => hive.id === hiveId)
            if (index !== -1) {
              runInAction(() => {
                this.hives[index].weight = latestWeight
              })
            }
          } else {
            console.log(`No weight data found for hive ${hiveId}`)
          }
        })

        this.unsubscribeFunctions.push(weightUnsubscribe)

        return {
          id: hiveId,
          name: data.hiveName,
          filters: data.hiveFilter,
          latLng: data.latLng,
          notes: [],
          preferences: data.notificationTypePreference,
          temperature: 4,
          weight: 0,
          humidity: 78,
          beeCount: 48,
          queen: { id: "abc123queenbee", dateOfBirth: new Date(Date.now()) },
        } as HiveModel
      })

      const hives = await Promise.all(hivePromises)

      runInAction(() => {
        this.hives = hives
      })

      console.log("Hives: ", this.hives)
    } catch (error) {
      console.error("Error fetching hives: ", error)
    }
  }

  @action async fetchNotesForHive(hiveId: string) {
    console.log("notes fetch called: ", hiveId)
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const notesCollectionRef = collection(
      db,
      `users/${userId}/hives/${hiveId}/notes`
    )
    const notesSnapshot = await getDocs(notesCollectionRef)
    runInAction(() => {
      const hiveIndex = this.hives.findIndex((hive) => hive.id === hiveId)
      if (hiveIndex !== -1) {
        this.hives[hiveIndex].notes = notesSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            note: data.note,
            isSticky: data.isSticky,
            timestamp: new Date(data.timestamp.seconds * 1000),
          } as HiveNote
        })
      }
    })
  }

  @action async fetchWeightDataForLast12Days(hiveId: string) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 4)

    try {
      const weightsRef = collection(
        db,
        `users/${userId}/hives/${hiveId}/weightReadings`
      )
      const queryWeights = query(
        weightsRef,
        where("date", ">=", Timestamp.fromDate(startDate)),
        orderBy("date", "asc")
      )

      const querySnapshot = await getDocs(queryWeights)
      const sensorData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          timestamp: data.date.toDate().toISOString(),
          value: data.weight,
        }
      })

      const sensorDataList: SensorDataList = {
        sensorData: sensorData,
        measurement: WeightMeasurement.Grams,
      }

      runInAction(() => {
        this.sensorWeight = sensorDataList
      })

      console.log("the sensor sweight", this.sensorWeight)

      console.log(
        "Fetched and transformed weight data for the last 12 days: ",
        sensorDataList
      )
    } catch (error) {
      console.error("Error fetching weight data: ", error)
    }
  }

  @action async fetchWeightDataForLast30Days(hiveId: string) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 12)

    try {
      const weightsRef = collection(
        db,
        `users/${userId}/hives/${hiveId}/weightReadings`
      )
      const queryWeights = query(
        weightsRef,
        where("date", ">=", Timestamp.fromDate(startDate)),
        orderBy("date", "asc")
      )

      const querySnapshot = await getDocs(queryWeights)
      const sensorData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          timestamp: data.date.toDate().toISOString(),
          value: data.weight,
        }
      })

      const sensorDataList: SensorDataList = {
        sensorData: sensorData,
        measurement: WeightMeasurement.Grams,
      }

      runInAction(() => {
        this.weightSensorDataExpanded = sensorDataList
      })

      console.log("the sensor sweight", this.weightSensorDataExpanded)

      console.log(
        "Fetched and transformed weight data for the last 30 days: ",
        sensorDataList
      )
    } catch (error) {
      console.error("Error fetching weight data: ", error)
    }
  }

  @action async addHive(hive: HiveModel) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }
    try {
      const hiveCollectionRef = collection(db, `users/${userId}/hives`)
      const doc = await addDoc(hiveCollectionRef, {
        hiveName: hive.name,
        hiveFilter: hive.filters,
        latLng: hive.latLng,
        notificationTypePreference: notificationTypePreferences,
      })
      runInAction(() => {
        this.hives.push({
          ...hive,
          id: doc.id,
        })
      })

      console.log("Hive added with ID:", doc.id)
    } catch (error) {
      console.error("Error adding hive: ", error)
    }
  }

  @action async updateHiveFilters(hiveToUpdate: HiveModel) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }
    const hiveRef = doc(db, `users/${userId}/hives/${hiveToUpdate.id}`)

    try {
      await updateDoc(hiveRef, {
        hiveFilter: hiveToUpdate.filters,
      })
      console.log("Hive updated successfully:", hiveToUpdate)
    } catch (error) {
      console.error("Error updating hive in Firestore:", error)
    }
  }

  @action async updateHiveName(hiveId: string, newName: string) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }
    const hiveRef = doc(db, `users/${userId}/hives/${hiveId}`)

    try {
      await updateDoc(hiveRef, {
        hiveName: newName,
      })
      console.log("Hive name updated successfully:", newName)

      runInAction(() => {
        const hive = this.hives.find((h) => h.id === hiveId)
        if (hive) {
          hive.name = newName
        }
      })
    } catch (error) {
      console.error("Error updating hive name in Firestore:", error)
    }
  }

  @action async removeHive(hiveId: string) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    runInAction(() => {
      this.hives = this.hives.filter((hive) => hive.id !== hiveId)
    })

    const hiveRef = doc(db, `users/${userId}/hives/${hiveId}`)
    try {
      await deleteDoc(hiveRef)
      console.log("Hive deleted successfully from the database")
    } catch (error) {
      console.error("Error deleting hive:", error)
    }
  }
  @action addFilter = async (filterName: string) => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const userRef = doc(db, "users", userId)
    try {
      await updateDoc(userRef, {
        filters: arrayUnion(filterName),
      })
      runInAction(() => {
        this.filters.push(filterName)
      })
    } catch (error) {
      console.error("Failed to add filter to Firestore:", error)
    }
  }

  @action numberOfHives() {
    return this.hives.length
  }

  @action async modifyHiveFilters(filter: string) {
    if (!this.selectedHive) {
      console.error("No hive selected")
      return
    }

    if (!this.selectedHive.filters.includes(filter)) {
      runInAction(() => {
        this.selectedHive.filters.push(filter)
      })

      const userId = auth.currentUser?.uid
      if (!userId) {
        console.error("User not logged in")
        return
      }

      const hiveRef = doc(db, `users/${userId}/hives/${this.selectedHive.id}`)

      try {
        await updateDoc(hiveRef, {
          hiveFilter: this.selectedHive.filters,
        })
        console.log("Filter added successfully to the database")
      } catch (error) {
        console.error("Error updating filters in the database:", error)
      }
    } else {
      console.log("Filter already exists in the selected hive")
    }
  }

  @action removeFilter = async (filter: string) => {
    runInAction(() => {
      this.filters = this.filters.filter((item) => item !== filter)
      this.hives = this.hives.map((hive) => ({
        ...hive,
        filters: hive.filters.filter((hiveFilter) => hiveFilter !== filter),
      }))
    })

    await this.updateFiltersInBothUserAndHive(filter)
  }

  updateFiltersInBothUserAndHive = async (filterToRemove: string) => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }
    const userRef = doc(db, "users", userId)
    const batch = writeBatch(db)

    batch.update(userRef, {
      filters: arrayRemove(filterToRemove),
    })

    this.hives
      .filter((hive) => hive.filters.includes(filterToRemove))
      .forEach((hive) => {
        const hiveRef = doc(db, "hives", hive.id)
        batch.update(hiveRef, {
          filters: arrayRemove(filterToRemove),
        })
      })

    try {
      await batch.commit()
      console.log("Successfully removed filter from user and hives.")
    } catch (error) {
      console.error("Failed to remove filter from Firestore:", error)
    }
  }

  @action numberOfFilters() {
    return this.filters.length
  }

  @action isFilterExists(filter: string) {
    return this.filters.includes(filter)
  }

  // This function is just used for when a hive card or notification is clicked on to navigate the
  // user to the specific hive.
  @action addSelectedHive(hive: HiveModel) {
    this.selectedHive = hive
  }

  @action getSelectedHive() {
    return this.selectedHive
  }

  @action getHiveFromId(hiveId: string): HiveModel | undefined {
    return this.hives.find((item) => item.id === hiveId)
  }

  @action getSelectedNotes() {
    return this.selectedHive?.notes
  }

  @action addSelectedNote(note: HiveNote) {
    this.selectedNote = note
  }

  @action getSelectedNote() {
    console.log("get selected note: ", this.selectedNote?.id)
    return this.selectedNote
  }

  @action async modifyNote(noteObject: HiveNote) {
    if (this.selectedHive && noteObject.id) {
      const noteIndex = this.selectedHive.notes.findIndex(
        (note) => note.id === noteObject.id
      )
      if (noteIndex !== -1) {
        const currentNote = this.selectedHive.notes[noteIndex]

        if (currentNote.note !== noteObject.note) {
          noteObject.timestamp = new Date()
        }

        this.selectedHive.notes[noteIndex] = noteObject

        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error("User not logged in")
          return
        }

        const noteRef = doc(
          db,
          `users/${userId}/hives/${this.selectedHive.id}/notes/${noteObject.id}`
        )

        try {
          const updateData = {
            note: noteObject.note,
            isSticky: noteObject.isSticky,
          }

          if (currentNote.note !== noteObject.note) {
            updateData.timestamp = Timestamp.fromDate(noteObject.timestamp)
          }

          await updateDoc(noteRef, updateData)
          console.log("Note updated successfully in the database")
        } catch (error) {
          console.error("Error updating note:", error)
        }
      } else {
        console.log("Note not found in the current hive")
      }
    } else {
      console.error("No hive selected or note ID missing")
    }
  }

  @action toggleNoteSticky(note: HiveNote): void {
    note.isSticky = !note.isSticky
    this.modifyNote(note)
  }
  @action sortNotes() {
    this.selectedHive?.notes.sort((a: HiveNote, b: HiveNote) => {
      if (Number(b.isSticky) - Number(a.isSticky) !== 0) {
        return Number(b.isSticky) - Number(a.isSticky)
      }
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
  }

  @action async removeNote(noteId: string) {
    if (this.selectedHive) {
      this.selectedHive.notes = this.selectedHive.notes.filter(
        (note) => note.id !== noteId
      )

      const userId = auth.currentUser?.uid
      if (!userId) {
        console.error("User not logged in")
        return
      }

      const noteRef = doc(
        db,
        `users/${userId}/hives/${this.selectedHive.id}/notes/${noteId}`
      )

      try {
        await deleteDoc(noteRef)
        console.log("Note deleted successfully from the database")
      } catch (error) {
        console.error("Error deleting note:", error)
      }
    } else {
      console.error("No selected hive to remove a note from")
    }
  }

  @action async addNoteToSelectedHive(newNote: HiveNote) {
    if (!this.selectedHive || !auth.currentUser) {
      console.error("No hive selected or user not authenticated")
      return
    }

    const notesCollectionRef = collection(
      db,
      `users/${auth.currentUser.uid}/hives/${this.selectedHive.id}/notes`
    )
    try {
      const docRef = await addDoc(notesCollectionRef, {
        note: newNote.note,
        isSticky: newNote.isSticky,
        timestamp: Timestamp.fromDate(newNote.timestamp),
      })

      runInAction(() => {
        const fullNote = { ...newNote, id: docRef.id }
        this.selectedHive?.notes.push(fullNote)
        console.log("Note added with ID:", docRef.id)
      })
      console.log("Note added successfully")
    } catch (error) {
      console.error("Error adding note:", error)
    }
  }

  @action async toggleNotificationPreference(
    type: NotificationType
  ): Promise<void> {
    if (!this.selectedHive) {
      console.error("No hive selected")
      return
    }

    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const hiveRef = doc(db, `users/${userId}/hives/${this.selectedHive.id}`)

    const docSnapshot = await getDoc(hiveRef)
    if (docSnapshot.exists()) {
      const hiveData = docSnapshot.data()
      const currentPreferences = hiveData.notificationTypePreference || {}

      currentPreferences[type] = !currentPreferences[type]

      try {
        await updateDoc(hiveRef, {
          notificationTypePreference: currentPreferences,
        })
        console.log(
          "Notification preferences updated successfully for the selected hive"
        )

        runInAction(() => {
          this.selectedHive.preferences = currentPreferences
        })
      } catch (error) {
        console.error("Error updating notification preferences:", error)
      }
    } else {
      console.error("Hive document does not exist")
    }
  }

  @action toggleNotificationPreferenceForSpecificHive(
    type: NotificationType,
    hiveId: string
  ): void {
    // TODO DB - Write notification type modification to DB. Note that this is for a specific hive, and
    // not notifications for all hives (user preferences).
    const hiveToModify = this.hives.find((hive) => hive.id === hiveId)

    if (hiveToModify && hiveToModify.preferences) {
      hiveToModify.preferences[type] = !hiveToModify.preferences[type]

      const hiveIndex = this.hives.findIndex((hive) => hive.id === hiveId)

      if (hiveIndex !== -1) {
        this.hives[hiveIndex] = hiveToModify
      }
    } else {
      // TODO Error handling
    }
  }
  @action async fetchNotificationPreferencesForHive(hiveId: string) {
    const userId = auth.currentUser?.uid
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const hiveRef = doc(db, `users/${userId}/hives/${hiveId}`)
    try {
      const docSnapshot = await getDoc(hiveRef)
      if (docSnapshot.exists()) {
        const hiveData = docSnapshot.data()
        runInAction(() => {
          const hiveIndex = this.hives.findIndex((hive) => hive.id === hiveId)
          if (hiveIndex !== -1) {
            this.hives[hiveIndex].preferences =
              hiveData.notificationTypePreference || {}
            console.log(
              "Notification preferences fetched:",
              this.hives[hiveIndex].preferences
            )
          } else {
            console.error("Hive not found in local state")
          }
        })
      } else {
        console.error("Hive document does not exist")
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error)
    }
  }
}

export const hiveViewModel = new HiveViewModel()

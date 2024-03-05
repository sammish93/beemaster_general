import { userViewModel } from '@/viewModels/UserViewModel';
import { HiveModel } from "@/models/hiveModel";
import { action, makeAutoObservable, runInAction } from "mobx";
import { filterData, hiveListData } from "../data/hiveData"; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { db, auth } from "@/firebaseConfig";

class HiveViewModel {
  hives: HiveModel[] = [];
  filters: string[] = [];


  constructor() {
    makeAutoObservable(this);
   
  }

  //TODO: fix the logic for the filters. when a filter is selected and there are hives with the said filter they show up but unable to select more filters.

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
}

export const hiveViewModel = new HiveViewModel();
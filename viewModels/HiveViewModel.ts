import { HiveModel } from "@/models/hiveModel";
import { action, makeAutoObservable, runInAction } from "mobx";
import { filterData, hiveListData } from "../data/hiveData"; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from "@/firebaseConfig";

class HiveViewModel {
    hives: HiveModel[] = [];
    filters: string[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchHives()
    }


   @action async fetchHives() {
      try {
        
          const userId = "rCoFxe3YsfV6JGruHQ3l3agajCn2"; 
          const querySnapshot = await getDocs(collection(db, `users/${userId}/hives`));
          runInAction(() => {
            const hives = querySnapshot.docs.map(doc => {
                const data = doc.data();
                
                return {
                    id: doc.id,
                    name: data.hiveName,
                    filters: data.filters,
                    
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
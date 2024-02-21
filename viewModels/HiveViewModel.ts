import { HiveModel } from "@/models/hiveModel";
import { makeAutoObservable } from "mobx";
import { hiveListData } from "../data/hiveData"; 

class HiveViewModel {
    hives: HiveModel[] = [];

    constructor() {
        makeAutoObservable(this);
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
}

export const hiveViewModel = new HiveViewModel();
import { HiveModel } from "@/models/hiveModel";
import { makeAutoObservable } from "mobx";
import { hiveListData } from "../data/hiveData"; 

class HiveViewModel {
    hives = hiveListData;

    constructor() {
        makeAutoObservable(this);
    }

    addHive(hive: HiveModel) {
        this.hives.push(hive);
    }

    removeHive(hiveId: string) {
        this.hives = this.hives.filter(item => item.hive.id !== hiveId);
    }
}
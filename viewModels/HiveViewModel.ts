import { HiveModel } from "@/models/hiveModel";
import { makeAutoObservable } from "mobx";
import { filterData, hiveListData } from "../data/hiveData"; 

class HiveViewModel {
    hives = hiveListData;
    filters = filterData;
    selectedHive?: HiveModel

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
}

export const hiveViewModel = new HiveViewModel();
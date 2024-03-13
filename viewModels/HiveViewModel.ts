import { HiveModel } from "@/models/hiveModel";
import { makeAutoObservable } from "mobx";
import { filterData, hiveListData } from "../data/hiveData"; 
import { HiveNote } from "@/models/note";

class HiveViewModel {
    hives = hiveListData;
    filters = filterData;
    selectedHive?: HiveModel
    selectedNote?: HiveNote

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
}

export const hiveViewModel = new HiveViewModel();
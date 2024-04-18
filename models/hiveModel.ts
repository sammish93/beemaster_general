import {
  NotificationTypePreference,
  NotificationType,
} from "@/constants/Notifications";
import { HiveNote } from "./note";

export interface HiveModel {
  id: string;
  name: string;
  filters: string[];
  latLng: { lat?: number; lng?: number };
  temperature?: number;
  weight?: number;
  humidity?: number;
  beeCount?: number;
  notes: HiveNote[];
  preferences: NotificationTypePreference;
  queen?: QueenBee;
}

export interface QueenBee {
  id: string;
  dateOfBirth: Date;
}

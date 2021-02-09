import { Vehicle } from "./vehicle";

export interface QueryResult {
    items: Vehicle[];
    totalItems: number;
}
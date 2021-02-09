import { features } from "process";
import { Contact } from "./contact";
import { Feature } from "./feature";

export interface Vehicle {
    id: number;
    make: { id: number, name: string };
    model: { id: number, name: string };
    contact: Contact;
    isRegistered: boolean;
    lastUpdate: string;
    features: Feature[];
}
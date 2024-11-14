import { objectID } from "../../../bakend/src//models/userModel";

export enum IDF {
    NORTH = "North",
    SOUTH = "South",
    CENTER = "Center",
    WESTBANK = "West Bank"
};

export enum Terorists {
    HEZBOLLAH = "Hezbollah",
    HAMAS = "Hamas",
    IRGC = "IRGC",
    HOUTHIS = "Houthis"
}

export interface IRegister {
    username: string;
    password: string;
    organization: string;
    location: string;
}

export interface IExploation {
    warriorId: objectID;
    status: string;
    attacker: string;
}
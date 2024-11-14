import missileModel, { Missile } from "../models/missileModel";
import organizationModel from "../models/orgonizationModel";
import UserModel, { User } from "../models/userModel";
import { IMissileResource, IResource } from "../types/types";
import bcrypt from "bcrypt";


export const terroristRegister = async (data: {username: string, password: string, organization: string}): Promise<User> => {
    try {
        const myOrganization = await organizationModel.findOne({name: data.organization});

        if(!myOrganization)
            throw new Error("organization not found");

        let mySources: IMissileResource[] = [];
        for (const r of myOrganization.resources) {
            const myMissile: Missile | null = await missileModel.findOne({name: r.name});
            if (!myMissile)
                throw new Error("missile in resource not found");
            mySources.push({ missile: myMissile, amount: r.amount });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newTerrorist = await UserModel.create({
            username: data.username, 
            password: hashedPassword, 
            organization: data.organization,
            resources: mySources 
        });

        return newTerrorist;
    } 
    catch (error: any) {
        throw new Error("error by insert terrorist: " + error.message);
    }
}

export const idfRegister = async (data: {username: string, password: string, organization: string, location: string}): Promise<User> => {
    try {
        const idfLocation = `${data.organization} - ${data.location}`;
        const myOrganization = await organizationModel.findOne({name: idfLocation});
        if(!myOrganization)
            throw new Error("organization you are trying to join not found");

        let mySources: IMissileResource[] = [];
        myOrganization.resources.forEach(async (r: IResource) => {
            const myMissile: Missile | null = await missileModel.findOne({name: r.name});
            if(!myMissile)
                throw new Error("missile in organization's resource not found");
            mySources.push({missile: myMissile, amount: r.amount});
        });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newSoldier = await UserModel.create({
            username: data.username, 
            password: hashedPassword, 
            organization: data.organization,
            location: data.location,
            resources: mySources 
        });

        return newSoldier;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to register a soldier" + error.message);
    }
}

export const UserLogin = async (username: string, password: string): Promise<User> => {
    try {
        const User = await UserModel.findOne({username});
        if(!User)
            throw new Error("User not found!");

        const comparedPassword = await bcrypt.compare(password, User.password);
        if(!comparedPassword)
            throw new Error("Invalid Password");

        return User;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to logging in" + error.message);
    }
}
import {Missile} from "../models/missileModel";
import userModel, {User} from "../models/userModel";
import {IMissileResource} from "../types/types";
import mongoose from "mongoose";

export const launchRocket = async (id: string, missileId: string): Promise<User> => {
    try {
        // המרת ה-id ל-ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        const user = await userModel.findById(objectId);

        if (!user)
            throw new Error(`User with id ${id} not found`);

        // const missileIndex = user.resources.findIndex((m: IMissileResource) => m.missile.id === missileId);
        const missileIndex = user.resources.findIndex((m: IMissileResource) => m.missile._id.toString() === missileId);
        console.log("missileIndex", missileIndex);
        

        if (missileIndex < 0)
            throw new Error(`Missile with id ${missileId} not found in resources`);

        user.resources[missileIndex].amount -= 1;
        await user.save();

        return user;
    } catch (error: any) {
        throw new Error(`Error occurred while trying to launch a rocket due to: ${error.message}`);
    }
}
export const exploadedRocket = async (id: string, status: "Hit" | "Intercepted", attackerId: string, missileId: string): Promise<User> => {
    try {
        const warrior = await userModel.findById(id);
        if (!warrior)
            throw new Error(`Warrior with id ${id} not found`);

        // המרת המתקיף ל-ObjectId
        const attackerObjectId = new mongoose.Types.ObjectId(attackerId);

        // הוספת פרטי השיגור להיסטוריית השיגור של הלוחם
        warrior.launchHistory.push({ rocket: attackerObjectId, status });
        await warrior.save();

        return warrior;
    } catch (error: any) {
        throw new Error("An error occurred while trying to handle explosion of rocket due to: " + error.message);
    }
}
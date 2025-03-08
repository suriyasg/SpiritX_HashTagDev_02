import { get, ref, update } from "firebase/database";
import { db } from "./firebase";
import { StatusCode } from '../constants/StatusCode'
import { Player, User } from "../../datamodel/types";
import { calculatePlayerValue } from "./serviceFunctions";

export async function addPlayerToUser(userId: string, player_id: string) {
    // Add validation when player not exists
    try {
        // Fetch the existing user data
        const userRef = ref(db, `User/${userId}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.val() as User;

            // Fetch the existing player data
            const playerref = ref(db, `Player/${player_id}`);
            const playerSnapshot = await get(playerref);
            if (playerSnapshot.exists()) {
                const playerData = playerSnapshot.val() as Player;
                const playerValue = calculatePlayerValue(playerData)
                const userMoney = Number(userData.money)
                if(userMoney) { // check user has valid money
                    if(playerValue === StatusCode.ERROR_CALCULATING_PLAYER_VALUE) {
                        return {status : StatusCode.ERROR_CALCULATING_PLAYER_VALUE, leftOver :null}
                    }
                    else if(userMoney - playerValue >= 0) {
                        // Check if player_ids exists and does not contain the playerId
                        const updatedPlayerIds = userData.player_ids && Array.isArray(userData.player_ids)
                            ? userData.player_ids.includes(player_id)
                                ? userData.player_ids  // If already present, return as is
                                : [...userData.player_ids, player_id] // Append if not present
                            : [player_id]; // Initialize array if it doesn't exist

                        // Update only if changes are needed
                        if (updatedPlayerIds !== userData.player_ids) {
                            await update(userRef, { player_ids: updatedPlayerIds, money : userMoney - playerValue });
                            console.log("Player added successfully!");
                            return {status : StatusCode.SUCCESS, leftOver :userMoney - playerValue }
                        } else {
                            console.log("Player already exists, Can not add same player twice.");
                            return {status : StatusCode.PLAYER_ALREADY_EXISTS, leftOver :null}
                        }
                    } 
                    else {
                        return {status : StatusCode.YOU_ARE_BROKE , leftOver :null}
                    }
                } 
                else { // user does not have valid money
                    return {status : StatusCode.YOU_DONT_HAVE_VALID_MONEY , leftOver :null}
                }
            }
            else {
                console.error("Player not found!");
                return {status : StatusCode.PLAYER_NOT_FOUND, leftOver :null}
            }

        } else {
            console.error("User not found!");
            return {status : StatusCode.USER_NOT_FOUND, leftOver :null}
        }
    } catch (error) {
        console.error("Error adding player:", error);
        return {status : StatusCode.ERROR_ADDING_PLAYER, leftOver :null}
    }
}
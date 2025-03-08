import { child, equalTo, get, limitToLast, orderByChild, orderByKey, push, query, ref, set, update } from "firebase/database";
import { db } from "./firebase";
import type { Player, User } from "./../../datamodel/types";
import { StatusCode } from '../constants/StatusCode'
import { calculatePoints } from "@/utils/playerCalculations";

export function createUser(user: User) {
    try {
        var path: string = `User/${user.user_id}`
        const userRef = ref(db, path);
        set(userRef, { ...user } as User);
    }
    catch (error) {
        console.log(error)
    }
}

export async function getUser(user_id: string) : Promise<User | undefined> {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `User/${user_id}`))
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return undefined;
        }
    }
    catch (error) {
        console.log(error)
    }
}


export async function calculateUserTotalTeamPoints(user_id: string, fromScratch: boolean = false) {
    const userRef = ref(db, `User/${user_id}`);
    try {
        // Fetch user data
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {
            console.error("User not found!");
            return { status: StatusCode.USER_NOT_FOUND, teamTotalPoints: null };
        }

        const userData: User = snapshot.val();
        if (!userData.player_ids || userData.player_ids.length === 0) {
            console.log("User has no players in their team.");
            return { status: StatusCode.NO_PLAYERS, teamTotalPoints: 0 };
        }

        let totalPoints = 0;
        
        // Fetch all player details
        for (const player_id of userData.player_ids) {
            const playerRef = ref(db, `Player/${player_id}`);
            const playerSnapshot = await get(playerRef);
            
            if (playerSnapshot.exists()) {
                const player: Player = playerSnapshot.val();
                
                // Use existing points or calculate if missing (or calculate all if scratch)
                var playerPoints;
                if(!fromScratch) {
                    playerPoints = player.player_points ?? calculatePoints(player);
                } 
                else {
                    playerPoints = calculatePoints(player);
                }
                totalPoints += playerPoints;
            } else {
                console.warn(`Player not found: ${player_id}`);
            }
        }

        // Update Firebase with new team_total_points
        await update(userRef, { team_total_points: totalPoints });

        console.log(`Updated team total points: ${totalPoints}`);
        return { status: StatusCode.SUCCESS, teamTotalPoints: totalPoints };

    } catch (error) {
        console.error("Error calculating team total points:", error);
        return { status: StatusCode.SERVER_ERROR, teamTotalPoints: null };
    }
}

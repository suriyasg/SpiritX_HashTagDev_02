import { ref, child, get, update, set } from "firebase/database";
import { db } from "./firebase";
import { calculateUserTotalTeamPoints } from "./UserService";
import { StatusCode } from "@/constants/StatusCode";
import { LeaderBoardRecord, User } from "../../datamodel/types";


// we won't use this unless we need static leader board to initialize a leaderboard
// we will use listeners in frontend instead for Real Time updates
export async function generateLeaderBoard() {
    try {
        const usersRef = ref(db, "User");
        const usersSnapshot = await get(usersRef);

        if (!usersSnapshot.exists()) {
            console.log("No users found.");
            return { status: StatusCode.NO_USERS_FOUND };
        }

        let leaderboard: { user_id: string; username: string; team_total_points: number }[] = [];

        // Step 1: Filter users with at least 11 players
        const users = Object.values(usersSnapshot.val()) as User[];
        users.forEach(user => {
            if (user.player_ids && user.player_ids.length >= 11) {
                leaderboard.push({
                    user_id: user.user_id,
                    username: user.username,
                    team_total_points: user.team_total_points || 0
                });
            }
        });

        // Step 2: Sort by team_total_points (descending order)
        leaderboard.sort((a, b) => b.team_total_points - a.team_total_points);

        // Step 3: Limit leaderboard to top 10 players (or less if fewer users meet the criteria)
        // const maxLeaderboardSize = 10;
        // leaderboard = leaderboard.slice(0, maxLeaderboardSize);

        // Step 4: Update leaderboard in Firebase
        const leaderboardRef = ref(db, "LeaderBoard");
        await set(leaderboardRef, leaderboard);

        console.log("Leaderboard generated successfully.");
        return { status: StatusCode.SUCCESS, leaderboard };

    } catch (error) {
        console.error("Error generating leaderboard:", error);
        return { status: StatusCode.ERROR };
    }
}



// here we will compare change only re-generate leader board if necessary
// but always change total_team_points of user in any cases
// get All players from that user and calculate current points 
// better if we store total points in user data and use that to add additional points
// and then if additinal point is larger than least of leaderboard
export async function generateLeaderBoardWhenUserAddsPlayer(user_id: string, username: string) {
    try {
        // Step 1: Calculate updated total team points for the user
        const result = await calculateUserTotalTeamPoints(user_id);
        console.log({result})
        if (result.status !== StatusCode.SUCCESS || result.teamTotalPoints === null) {
            console.error("Failed to calculate user total points.");
            return { status: result.status };
        }
        const updatedPoints = result.teamTotalPoints;

        // Step 2: Fetch current leaderboard
        const leaderboardRef = ref(db, "LeaderBoard");
        const leaderboardSnapshot = await get(leaderboardRef);

        let leaderboard: LeaderBoardRecord[] = leaderboardSnapshot.exists()
            ? Object.values(leaderboardSnapshot.val())
            : [];

        // Step 3: Always update user's total points in Firebase
        const userRef = ref(db, `User/${user_id}`);
        await update(userRef, { team_total_points: updatedPoints });
        // Step 4: If leaderboard is empty, add user directly
        if (leaderboard.length === 0) {
            await set(leaderboardRef, [{ user_id, team_total_points: updatedPoints, username }]);
            console.log("Leaderboard initialized with first user.");
            return { status: StatusCode.SUCCESS, updatedLeaderboard: true };
        }

        // Step 5: Check if the user is already on the leaderboard
        const userIndex = leaderboard.findIndex(entry => entry.user_id === user_id);
        if (userIndex !== -1) {
            leaderboard[userIndex].team_total_points = updatedPoints; // Update user's points
        } else {
            // Step 6: Check if the new points qualify for the leaderboard
            leaderboard.push({ user_id, team_total_points: updatedPoints,  username});
        }

        // Step 7: Sort leaderboard in descending order and keep top N (e.g., 10) No max size
        leaderboard.sort((a, b) => b.team_total_points - a.team_total_points);

        // const maxLeaderboardSize = 15;
        // if (leaderboard.length > maxLeaderboardSize) {
        //     leaderboard = leaderboard.slice(0, maxLeaderboardSize);
        // }

        // Step 8: Update leaderboard in Firebase
        await set(leaderboardRef, leaderboard);
        console.log("Leaderboard updated successfully.");

        return { status: StatusCode.SUCCESS };

    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return { status: StatusCode.SERVER_ERROR };
    }
}

// 
// here we may only need to update leaderboard if one of the player in leader board removes player
// but always change total_team_points of user in any cases
export async function generateLeaderBoardWhenUserRemovesPlayer(user_id: string) {
    try {
        // Step 1: Calculate updated total team points for the user
        const result = await calculateUserTotalTeamPoints(user_id);
        if (result.status !== StatusCode.SUCCESS || result.teamTotalPoints === null) {
            console.error("Failed to calculate user total points.");
            return { status: result.status };
        }
        const updatedPoints = result.teamTotalPoints;

        // Step 2: Fetch current leaderboard
        const leaderboardRef = ref(db, "LeaderBoard");
        const leaderboardSnapshot = await get(leaderboardRef);

        let leaderboard: { user_id: string; team_total_points: number }[] = leaderboardSnapshot.exists()
            ? Object.values(leaderboardSnapshot.val())
            : [];

        // Step 3: Always update user's total points in Firebase
        const userRef = ref(db, `User/${user_id}`);
        await update(userRef, { team_total_points: updatedPoints });

        // Step 4: Check if the user is currently on the leaderboard
        const userIndex = leaderboard.findIndex(entry => entry.user_id === user_id);

        if (userIndex !== -1) {
            // Step 5: Update user's points on leaderboard or remove them if points too low
            leaderboard[userIndex].team_total_points = updatedPoints;

            // If the user's new points are too low, remove them from the leaderboard
            // const minPoints = leaderboard.length > 10
            //     ? leaderboard[9].team_total_points
            //     : 0; // If less than 10 users, allow any score
            
            // if (updatedPoints < minPoints) {
            //     leaderboard.splice(userIndex, 1);
            // }
        }

        // Step 6: Sort leaderboard and keep top N users
        leaderboard.sort((a, b) => b.team_total_points - a.team_total_points);
        // const maxLeaderboardSize = 10;
        // if (leaderboard.length > maxLeaderboardSize) {
        //     leaderboard = leaderboard.slice(0, maxLeaderboardSize);
        // }

        // Step 7: Update leaderboard in Firebase only if it changed
        await set(leaderboardRef, leaderboard);
        console.log("Leaderboard updated successfully!");

        return { status: StatusCode.SUCCESS };

    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return { status: StatusCode.SERVER_ERROR };
    }
}


export async function removeUserFromLeaderBoard(user_id: string) {
    try {
        const leaderboardRef = ref(db, "LeaderBoard");
        const leaderboardSnapshot = await get(leaderboardRef);

        let leaderboard: LeaderBoardRecord[] = leaderboardSnapshot.exists()
            ? Object.values(leaderboardSnapshot.val())
            : [];

        const userIndex = leaderboard.findIndex(entry => entry.user_id === user_id);
        if (userIndex !== -1) {
            leaderboard.splice(userIndex, 1);
        }

        await set(leaderboardRef, leaderboard);
        console.log("Leaderboard updated successfully.");

        return { status: StatusCode.SUCCESS };

    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return { status: StatusCode.SERVER_ERROR };
    }
}

// we will call this function when player's point changes due to updates
export async function generateLeaderBoardAdminUpdatePlayer(player_id: string, pointsDifference : number) { // new points - old points
    try {
        const usersRef = ref(db, "User");
        const usersSnapshot = await get(usersRef);

        if (!usersSnapshot.exists()) {
            console.log("No users found.");
            return { status: StatusCode.NO_USERS_FOUND };
        }

        let leaderboard: { user_id: string; username: string; team_total_points: number }[] = [];

        const updates: Record<string, number> = {};
        // Step 1: Filter users with at least 11 players
        const users = Object.values(usersSnapshot.val()) as User[];
        users.forEach(user => {
            if (user.player_ids && user.player_ids.length >= 11) {
                // check if user has that player in their team if yes update the total team points
                if (user.player_ids.includes(player_id)) {
                    // Add points difference to the user's total team points
                    const newTotalPoints = (user.team_total_points ?? 0) + pointsDifference;
                    updates[`users/${user.user_id}/team_total_points`] = newTotalPoints;
                }
            }
        });
        // Update all affected users in the database
        await update(ref(db), updates);

        return generateLeaderBoard()
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return { status: StatusCode.SERVER_ERROR };
    }
}
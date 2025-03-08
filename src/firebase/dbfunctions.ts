import { child, equalTo, get, limitToLast, orderByChild, orderByKey, push, query, ref, set, update } from "firebase/database";
import { db } from "./firebase";
import type { Player, User } from "./../../datamodel/types";

export function createUser(user: User) {
    var path: string = `User/${user.user_id}`
    const userRef = ref(db, path);
    set(userRef, { ...user } as User);
}

export async function getUser(user_id: string) {
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

export function createPlayer(player: Omit<Player, "player_id"> & { player_id?: string }) {
    const playerRef = ref(db, "Player");
    const newPlayerRef = push(playerRef); // Generates a unique ID
    const player_id = newPlayerRef.key as string; // Extracts the generated ID

    const newPlayer: Player = {
        ...player,
        player_id // Assign the generated ID
    };

    set(newPlayerRef, newPlayer)
        .then(() => console.log("Player created successfully!", player_id))
        .catch((error) => console.error("Error creating player:", error));

    return player_id; // Return the new ID for reference
}

export async function getPlayer(player_id: string) {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `Player/${player_id}`))
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

export async function updatePlayer(player_id: string, updatedData: Partial<Player>) {
    const playerRef = ref(db, `Player/${player_id}`);

    try {
        const snapshot = await get(playerRef);
        if (snapshot.exists()) {
            const existingPlayer: Player = snapshot.val();

            // Merge new data while keeping old fields intact
            const finalUpdate = {
                ...existingPlayer,
                ...updatedData
            };

            await update(playerRef, finalUpdate);
            console.log("Player updated successfully!");
        } else {
            console.error("Player not found!");
        }
    } catch (error) {
        console.error("Error updating player:", error);
    }
}


export const getPlayersByCategory = async (category: string) => {
    const playersRef = ref(db, "Player");
    const q = query(playersRef, orderByChild("category"), equalTo(category));

    try {
        const snapshot = await get(q);
        if (snapshot.exists()) {
            return Object.values(snapshot.val()); // Convert Firebase object to an array
        } else {
            console.log("No players found in this category.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
};

export async function addPlayerToUser(userId: string, player_id: string) {
    const userRef = ref(db, `User/${userId}`);

    try {
        // Fetch the existing user data
        const snapshot = await get(userRef);
        console.log({ snapshot })
        if (snapshot.exists()) {
            const userData = snapshot.val();

            // Check if player_ids exists and does not contain the playerId
            const updatedPlayerIds = userData.player_ids && Array.isArray(userData.player_ids)
                ? userData.player_ids.includes(player_id)
                    ? userData.player_ids  // If already present, return as is
                    : [...userData.player_ids, player_id] // Append if not present
                : [player_id]; // Initialize array if it doesn't exist

            // Update only if changes are needed
            if (updatedPlayerIds !== userData.player_ids) {
                await update(userRef, { player_ids: updatedPlayerIds });
                console.log("Player added successfully!");
            } else {
                console.log("Player already exists, no update needed.");
            }
        } else {
            console.error("User not found!");
        }
    } catch (error) {
        console.error("Error adding player:", error);
    }
}
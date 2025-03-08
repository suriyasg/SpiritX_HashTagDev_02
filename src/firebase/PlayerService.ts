import { child, equalTo, get, limitToLast, orderByChild, orderByKey, push, query, ref, remove, set, update } from "firebase/database";
import { db } from "./firebase";
import type { Player, User } from "./../../datamodel/types";
import { StatusCode } from '../constants/StatusCode'


export async function createPlayer(player: Omit<Player, "player_id"> & { player_id?: string }) {
    const playerRef = ref(db, "Player");
    const newPlayerRef = push(playerRef); // Generates a unique ID
    const player_id = newPlayerRef.key as string; // Extracts the generated ID

    const newPlayer: Player = {
        ...player,
        player_id // Assign the generated ID
    };
    try {
        await set(newPlayerRef, newPlayer);
        console.log("Player created successfully!", player_id);
        return player_id
    }
    catch(error) {
        console.error("Error creating player:", error);
        return undefined
    }
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

export async function getAllPlayers() {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `Player`))
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
    try {
        const playerRef = ref(db, `Player/${player_id}`);
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

export async function deletePlayer(player_id: string) {
    const playerRef = ref(db, `Player/${player_id}`);
    try {
        await remove(playerRef);
        console.log("Player deleted successfully!", player_id);
        return "Player deleted successfully!";
    } catch (error) {
        console.error("Error deleting player:", error);
        return "Error deleting player!";
    }
}


export const getPlayersByCategory = async (category: string) => {
    try {
        const playersRef = ref(db, "Player");
        const q = query(playersRef, orderByChild("category"), equalTo(category));
        const snapshot = await get(q);
        if (snapshot.exists()) {
            return Object.values(snapshot.val()); // Convert Firebase object to an array
        } else {
            console.log("No players found in this category.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching players:", error);
        return []
    }
};
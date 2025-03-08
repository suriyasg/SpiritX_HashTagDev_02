import { get, ref, update } from "firebase/database";
import { db } from "./firebase";
import { StatusCode } from '../constants/StatusCode'
import { Player, User } from "../../datamodel/types";
import { calculatePlayerValue } from "./serviceFunctions";
import { generateLeaderBoardWhenUserAddsPlayer, removeUserFromLeaderBoard } from "./LeaderBoardService";

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
                if (userMoney) { // check user has valid money
                    if (playerValue === StatusCode.ERROR_CALCULATING_PLAYER_VALUE) {
                        return { status: StatusCode.ERROR_CALCULATING_PLAYER_VALUE, leftOver: null }
                    }
                    else if (userMoney - playerValue >= 0) {
                        // Check if player_ids exists and does not contain the playerId
                        console.log("userData.player_ids", userData.player_ids)
                        const updatedPlayerIds = userData.player_ids && Array.isArray(userData.player_ids)
                            ? userData.player_ids.includes(player_id)
                                ? userData.player_ids
                                : [...userData.player_ids, player_id].filter(Boolean)  // Removes undefined values
                            : [player_id];

                        // Update only if changes are needed
                        if (updatedPlayerIds !== userData.player_ids) {
                            console.log(updatedPlayerIds)
                            await update(userRef, { player_ids: updatedPlayerIds, money: userMoney - playerValue });
                            console.log("Player added successfully!");
                            if (updatedPlayerIds.length >= 11) {
                                await generateLeaderBoardWhenUserAddsPlayer(userId, userData.username) // potential slowing component
                            }
                            return { status: StatusCode.SUCCESS, leftOver: userMoney - playerValue }
                        } else {
                            console.log("Player already exists, Can not add same player twice.");
                            return { status: StatusCode.PLAYER_ALREADY_EXISTS, leftOver: null }
                        }
                    }
                    else {
                        return { status: StatusCode.YOU_ARE_BROKE, leftOver: null }
                    }
                }
                else { // user does not have valid money
                    return { status: StatusCode.YOU_DONT_HAVE_VALID_MONEY, leftOver: null }
                }
            }
            else {
                console.error("Player not found!");
                return { status: StatusCode.PLAYER_NOT_FOUND, leftOver: null }
            }

        } else {
            console.error("User not found!");
            return { status: StatusCode.USER_NOT_FOUND, leftOver: null }
        }
    } catch (error) {
        console.error("Error adding player:", error);
        return { status: StatusCode.ERROR_ADDING_PLAYER, leftOver: null }
    }
}

export async function addMultiplePlayersToUser(userId: string, playerIds: string[]) {
    const userRef = ref(db, `User/${userId}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
        console.error("User not found!");
        return { status: StatusCode.USER_NOT_FOUND, leftOver: null };
    }

    const userData = userSnapshot.val() as User;
    let userMoney = Number(userData.money);
    if (!userMoney) {
        return { status: StatusCode.YOU_DONT_HAVE_VALID_MONEY, leftOver: null };
    }
    const uniquePlayerIds = Array.from(new Set(playerIds));

    // Fetch all players and filter out invalid ones
    const invalidPlayers: string[] = []
    const validPlayers: string[] = [];
    const alreadyOwned: string[] = [];
    const cannotBuy: string[] = [];
    const userPlayerIds = new Set(userData.player_ids || []);

    for (const playerId of uniquePlayerIds) {
        const playerRef = ref(db, `Player/${playerId}`);
        const playerSnapshot = await get(playerRef);

        if (!playerSnapshot.exists()) {
            invalidPlayers.push(playerId)
            console.warn(`Player ${playerId} not found, skipping.`);
            continue; // Skip invalid players
        }

        if (userPlayerIds.has(playerId)) {
            alreadyOwned.push(playerId); // Player already owned
            continue;
        }

        const playerData = playerSnapshot.val() as Player;
        const playerValue = calculatePlayerValue(playerData);

        if (playerValue === StatusCode.ERROR_CALCULATING_PLAYER_VALUE) {
            continue; // Skip invalid player value
        }

        if (userMoney >= playerValue) {
            validPlayers.push(playerId);
            userMoney -= playerValue; // Deduct money
        } else {
            cannotBuy.push(playerId); // Not enough money
        }
    }

    // Update user if they have new players to add
    if (validPlayers.length > 0) {
        const updatedPlayerIds = [...userPlayerIds, ...validPlayers];

        await update(userRef, { 
            player_ids: updatedPlayerIds, 
            money: userMoney 
        });

        console.log("Players added successfully!", validPlayers);

        if (updatedPlayerIds.length >= 11) {
            await generateLeaderBoardWhenUserAddsPlayer(userId, userData.username);
        }
    }

    return {
        status: StatusCode.SUCCESS,
        leftOver: userMoney,
        added: validPlayers,
        alreadyOwned,
        cannotBuy,
        invalidPlayers
    };
}

export async function removePlayerFromUser(userId: string, player_id: string) {
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
                if (userMoney) { // check user has valid money
                    if (playerValue === StatusCode.ERROR_CALCULATING_PLAYER_VALUE) {
                        return { status: StatusCode.ERROR_CALCULATING_PLAYER_VALUE, leftOver: userMoney }
                    }
                    else {
                        // Check if player_ids exists and contains the playerId
                        if (userData.player_ids && Array.isArray(userData.player_ids) && userData.player_ids.includes(player_id)) {
                            // Remove the playerId
                            const updatedPlayerIds = userData.player_ids.filter((id: string) => id !== player_id);

                            // Refund player's value back to user
                            const updatedMoney = userMoney + playerValue;

                            // Update Firebase with new player list and money
                            await update(userRef, { player_ids: updatedPlayerIds, money: updatedMoney });
                            if (updatedPlayerIds.length >= 11) {
                                await generateLeaderBoardWhenUserAddsPlayer(userId, userData.username) // potential slowing component
                            } else {
                                await removeUserFromLeaderBoard(userId)
                            }
                            console.log("Player removed successfully!");
                            return { status: StatusCode.SUCCESS, leftOver: updatedMoney };
                        } else {
                            console.log("Player does not exist, cannot remove.");
                            return { status: StatusCode.PLAYER_NOT_FOUND, leftOver: userMoney };
                        }
                    }
                }
                else { // user does not have valid money
                    return { status: StatusCode.YOU_DONT_HAVE_VALID_MONEY, leftOver: null }
                }
            }
            else {
                console.error("Player not found!");
                return { status: StatusCode.PLAYER_NOT_FOUND, leftOver: null }
            }

        } else {
            console.error("User not found!");
            return { status: StatusCode.USER_NOT_FOUND, leftOver: null }
        }
    } catch (error) {
        console.error("Error adding player:", error);
        return { status: StatusCode.ERROR_REMOVING_PLAYER, leftOver: null }
    }
}
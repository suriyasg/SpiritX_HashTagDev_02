import { child, equalTo, get, limitToLast, orderByChild, orderByKey, push, query, ref, set, update } from "firebase/database";
import { db } from "./firebase";
import type { Admin, Player, User } from "./../../datamodel/types";
import { StatusCode } from '../constants/StatusCode'
import { calculatePoints } from "@/utils/playerCalculations";

export async function createAdmin(admin: Admin) {
    try {
        const adminRef = ref(db, 'Admin/');
        const newAdminRef = push(adminRef)
        const admin_id = newAdminRef.key as string; // Extracts the generated ID
        const newAdmin: Admin = {
            ...admin,
            admin_id
        };
        await set(newAdminRef, newAdmin);
        return admin_id;
    }
    catch (error) {
        console.log(error)
        return undefined
    }
}

export async function getAdmin(admin_id: string) : Promise<Admin | undefined> {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `Admin/${admin_id}`))
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

export async function getAdminByUserName(admin_name: string): Promise<Admin | StatusCode> {
    try {
        const userRef = ref(db, "Admin"); // Reference to the "User" node

        // Query to find user by username
        const admin_name_Query = query(userRef, orderByChild("admin_name"), equalTo(admin_name));
        const snapshot = await get(admin_name_Query);

        if (snapshot.exists()) {
            // Firebase returns an object with the user key as property, extract the first user
            const admins = snapshot.val();
            const admin_id = Object.keys(admins)[0]; // Get the first matching user ID
            return admins[admin_id]; // Return user data
        } else {
            console.log("No user found with this admin name.");
            return StatusCode.NO_USERS_FOUND;
        }
    } catch (error) {
        console.error("Error fetching user by admin name:", error);
        return StatusCode.DB_ERROR;;
    }
}
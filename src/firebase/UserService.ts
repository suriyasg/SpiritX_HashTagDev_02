import { child, equalTo, get, limitToLast, orderByChild, orderByKey, push, query, ref, set, update } from "firebase/database";
import { db } from "./firebase";
import type { User } from "./../../datamodel/types";
import { StatusCode } from '../constants/StatusCode'

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
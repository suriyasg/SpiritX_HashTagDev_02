import { StatusCode } from "@/constants/StatusCode";
import { Player } from "../../datamodel/types";

export const calculatePlayerValue = (player: Player) => {
    try {
        const points = 100; // TODO Find points 
        if(points){
            return Math.round(((9 * points + 100) * 1000)/50000) * 50000; // round to near 50 000
        }
        else {
            return StatusCode.ERROR_CALCULATING_PLAYER_VALUE
        }
    } catch (error) {
        console.error("Error calculating player value:", error);
        return StatusCode.ERROR_CALCULATING_PLAYER_VALUE // TODO: add more definitive error
    }
};
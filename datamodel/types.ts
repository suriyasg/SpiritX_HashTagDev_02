export type Admin = {
    admin_id: string;
    admin_name: string;
    password: string;
}

export type User = {
    user_id: string;
    username: string;
    password: string;
    money: number;
    player_ids?: string[];
}

export type Player = {
    player_id: string;
    name :string;
    university:string;
    category:string;
    total_runs:number;
    balls_faced: number;
    innings_played: number;	
    wickets: number;	
    overs_bowled: number; 	
    runs_conceded: number;
    player_points?: number;
}


export enum StatusCode {
    // common
    SUCCESS = "SUCCESS",
    SERVER_ERROR = "SERVER_ERROR",
    INVALID_INPUT = "INVALID_INPUT",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    NOT_FOUND = "USER_NOT_FOUND",
    DB_ERROR = "DB_ERROR",

    // players related
    PLAYER_ALREADY_EXISTS = "PLAYER_ALREADY_EXISTS",
    FAILED_PLAYER_CREATION = "FAILED_PLAYER_CREATION",
    FAILED_PLAYER_DELETION = "FAILED_PLAYER_DELETION",
    ERROR_ADDING_PLAYER = "ERROR_ADDING_PLAYER",
    ERROR_REMOVING_PLAYER = "ERROR_REMOVING_PLAYER",
    PLAYER_NOT_FOUND = "PLAYER_NOT_FOUND",
    ERROR_CALCULATING_PLAYER_VALUE ="ERROR_CALCULATING_PLAYER_VALUE",
    NO_PLAYERS = "NO_PLAYERS",

    // User Related
    NEW_USER_CREATED = "NEW_USER_CREATED",
    FAILED_USER_CREATION = "FAILED_USER_CREATION",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    YOU_ARE_BROKE = "YOU_ARE_BROKE",
    YOU_DONT_HAVE_VALID_MONEY = "YOU_DONT_HAVE_VALID_MONEY",
    NO_USERS_FOUND = "NO_USERS_FOUND",
    ERROR = "ERROR",
    USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
}

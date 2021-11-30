export const EMER_CONTACT_NAME = "emergencyContactName";
export const EMER_CONTACT_PHONE = "emergencyContactNumber";
export const VIBR_INTENSITY = "vibrationIntensity";
export const STAIRS_VIBR = "staircaseVibration";
export const OPEN_DOOR_VIBR = "openDoorVibration";
export const CLOSED_DOOR_VIBR = "closedDoorVibration";
export const MOVING_OBJ_VIBR = "movingObjectVibration";
export const DO_CALL_CONTACT = "callContact";
export const DO_CALL_911 = "call911";

const initialState = {
    [EMER_CONTACT_NAME]: null,
    [EMER_CONTACT_PHONE]: null,
    [VIBR_INTENSITY]: 3,
    [STAIRS_VIBR]: "vibration1",
    [OPEN_DOOR_VIBR]: "vibration2",
    [CLOSED_DOOR_VIBR]: "vibration3",
    [MOVING_OBJ_VIBR]: "vibration4",
    [DO_CALL_CONTACT]: true,
    [DO_CALL_911]: false,
}

export const settingsReducer = (state=initialState, action) => {
    switch(action.type) {
        case EMER_CONTACT_NAME:
            return {...state, [EMER_CONTACT_NAME]:action.value};
        case EMER_CONTACT_PHONE:
            return {...state, [EMER_CONTACT_PHONE]:action.value};
        case VIBR_INTENSITY:
            return {...state, [VIBR_INTENSITY]:action.value};
        case STAIRS_VIBR:
            return {...state, [STAIRS_VIBR]:action.value};
        case OPEN_DOOR_VIBR:
            return {...state, [OPEN_DOOR_VIBR]:action.value};
        case CLOSED_DOOR_VIBR:
            return {...state, [CLOSED_DOOR_VIBR]:action.value};
        case MOVING_OBJ_VIBR:
            return {...state, [MOVING_OBJ_VIBR]:action.value};
        case DO_CALL_CONTACT:
            return {...state, [DO_CALL_CONTACT]:action.value};
        case DO_CALL_911:
            return {...state, [DO_CALL_911]:action.value};
        default:
            return state;      
    }
}
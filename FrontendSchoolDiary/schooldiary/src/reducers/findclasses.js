const initState = '';

export default function findclasses(state = initState, action){
    if(action.type === "FIND_STR_CLASSES"){
        return action.payload;
    }
    return state;
}
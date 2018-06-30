const initState = '';

export default function findclassstudents(state = initState, action){
    if(action.type === "FIND_STR_CLASS_STUDENTS"){
        return action.payload;
    }
    return state;
}
const initState = '';

export default function findclassmates(state = initState, action){
    if(action.type === "FIND_STR_CLASSMATES"){
        return action.payload;
    }
    return state;
}
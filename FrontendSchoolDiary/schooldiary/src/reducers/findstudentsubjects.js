const initState = '';

export default function findstudentsubjects(state = initState, action){
    if(action.type === "FIND_STR_STUDENT_SUBJECTS"){
        return action.payload;
    }
    return state;
}
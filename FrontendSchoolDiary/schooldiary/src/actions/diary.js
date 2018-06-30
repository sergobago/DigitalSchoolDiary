import axios from 'axios';
import { url_path_main_server } from './../configurePath';
import {actionUserDataLogout} from './logout';

export const asyncRequestTeacherStudentsMarks = (history, token, teacherid, subjectid, classid) => dispatch => {
    dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_STARTING" });
    axios.get(url_path_main_server + '/getteacherstudentsmarks', {
        params: { teacherid: teacherid, subjectid: subjectid, classid: classid },
        headers: {'jwt-token-x-api-key': token} }).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_RESULTED", payload: result_payload.item_marks });
            }else{
                dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_RESULTED_WITH_ERROR", payload: result_payload });
                if(result_payload.logout) dispatch(actionUserDataLogout(history));
            }
        }else{
            dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_ERROR" });
        console.log(error);
    });
};

export const asyncRequestAddMark = (history, token, teacherid, subjectid, classid, pcode, pmark, pdate, pstudent) => dispatch => {
    dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_STARTING" });
    axios.get(url_path_main_server + '/addstudentmark', {
        params: { teacherid: teacherid, subjectid: subjectid, classid: classid, code: pcode, mark: pmark, pdate: pdate, student: pstudent },
        headers: {'jwt-token-x-api-key': token} }).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_RESULTED", payload: result_payload.item_marks });
            }else{
                dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_RESULTED_WITH_ERROR", payload: result_payload });
                if(result_payload.logout) dispatch(actionUserDataLogout(history));
            }
        }else{
            dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_TEACHERSTUDENTSMARKS_ERROR" });
        console.log(error);
    });
};
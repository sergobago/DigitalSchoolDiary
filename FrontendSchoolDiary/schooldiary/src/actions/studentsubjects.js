import axios from 'axios';
import { url_path_main_server } from './../configurePath';
import {actionUserDataLogout} from './logout';

export const asyncRequestStudentSubjects = (history, token) => dispatch => {
    dispatch({ type:"REQUEST_STUDENTSUBJECTS_STARTING" });
    axios.get(url_path_main_server + '/getstudentrating', { headers: {'jwt-token-x-api-key': token} }).then(function (response) {
        if(response.status === 200){
            const result_payload = response.data[0];
            if(result_payload.status === 200){
                dispatch({ type:"REQUEST_STUDENTSUBJECTS_RESULTED", payload: result_payload.item_marks });
            }else{
                dispatch({ type:"REQUEST_STUDENTSUBJECTS_RESULTED_WITH_ERROR", payload: result_payload });
                if(result_payload.logout) dispatch(actionUserDataLogout(history));
            }
        }else{
            dispatch({ type:"REQUEST_STUDENTSUBJECTS_ERROR" });
            console.log("Error request " + response.status);
        }
    }).catch(function (error) {
        dispatch({ type:"REQUEST_STUDENTSUBJECTS_ERROR" });
        console.log(error);
    });
};